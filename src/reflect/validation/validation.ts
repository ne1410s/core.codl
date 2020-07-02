import 'reflect-metadata';
import { Ctor } from '../../types';
import { ValidationKey, MetadataKey } from '../../mdkeys';
import {
  ValidationSummary,
  ValidationResult,
  ValidatorDef,
  ValidationInstruction,
  Validator,
  ObjectTest,
  PropertyTest,
} from './models';
import { RequiredValidator } from './validators/required';
import { RegexValidator } from './validators/regex';
import { RangeValidator } from './validators/range';
import { LengthRangeValidator } from './validators/length-range';
import { TypeValidator } from './validators/type';
import { CustValidator } from './validators/custom';

/** Reflects validation decoration. */
export abstract class ReflectValidation {
  /**
   * Performs validation - for objects with decorated members.
   * @param target The object to validate.
   * @param type The strong type (to supply prototype data).
   */
  public static validate<T extends Object>(target: Object, type?: Ctor<T>): ValidationSummary {
    const proto = type?.prototype || Object.getPrototypeOf(target || {});
    if (!proto) throw new TypeError('No type data could be found');

    const checks = this.getValidators();
    const rawTests = this.getTestInstructions(checks, proto, target);
    const testPlan = this.prepareTestPlan(rawTests);
    const results = this.executeTestPlan(testPlan);
    const retVal = this.summarise(results);

    return retVal;
  }

  /**
   * Gets all available tests and their associated validator. There is expected
   * duplication where one validator is used to perform multiple tests.
   */
  private static getValidators(): ValidatorDef[] {
    return Object.keys(ValidationKey).map((test) => {
      const meta = (ValidationKey as any)[test] as ValidationKey;
      const fn = ReflectValidation.getValidator(meta);
      return { fn, test, meta };
    });
  }

  /** Gets the validator function for a given key. */
  private static getValidator(key: string) {
    switch (key) {
      case ValidationKey.MIN_LENGTH:
      case ValidationKey.MAX_LENGTH:
        return LengthRangeValidator;

      case ValidationKey.MIN:
      case ValidationKey.MAX:
        return RangeValidator;

      case ValidationKey.REQUIRED:
        return RequiredValidator;
      case ValidationKey.REGEX:
        return RegexValidator;
      case ValidationKey.TYPE:
        return TypeValidator;
      case ValidationKey.CUSTOM:
        return CustValidator;

      default:
        throw new RangeError(`No validator implemented for ${key}`);
    }
  }

  /** Prepares a sequence of validation instructions. */
  private static getTestInstructions(
    allChecks: ValidatorDef[],
    proto: any,
    trg: Object,
    pfx: string = ''
  ): ValidationInstruction[] {
    const fnScorer = (ins: ValidationInstruction): number => {
      return ins.fn === RequiredValidator ? 2 : ins.fn === TypeValidator ? 1 : 0;
    };

    return Reflect.getMetadataKeys(proto)
      .map((k) => `${k}`)
      .reduce((acc, cur) => {
        const valDef = allChecks.filter((dg) => cur.indexOf(dg.meta + ':') === 0)[0];
        if (valDef) {
          const key = cur.replace(valDef.meta + ':', '');
          const navkey = pfx ? `${pfx}.${key}` : key;
          const prior = acc.filter((a) => a.navkey === navkey && a.fn === valDef.fn)[0];
          if (prior) {
            prior.tests.push(valDef.test);
          } else {
            acc.push({
              navkey,
              key,
              trg,
              proto,
              fn: valDef.fn,
              tests: [valDef.test],
            });
          }
        } else if (cur.indexOf(`${MetadataKey.MODEL}:`) === 0) {
          const subkey = cur.replace(`${MetadataKey.MODEL}:`, '');
          const subproto = Reflect.getMetadata(cur, proto).prototype;
          const subobj = ((trg as any) || {})[subkey];
          if (Array.isArray(subobj)) {
            subobj.forEach((subitem, i) => {
              const subpfx = pfx ? `${pfx}.${subkey}[${i}]` : `${subkey}[${i}]`;
              acc.push(
                ...ReflectValidation.getTestInstructions(allChecks, subproto, subitem || {}, subpfx)
              );
            });
          } else if (subobj) {
            const subpfx = pfx ? `${pfx}.${subkey}` : subkey;
            acc.push(...ReflectValidation.getTestInstructions(allChecks, subproto, subobj, subpfx));
          }
        }
        return acc;
      }, [] as ValidationInstruction[])
      .sort((a, b) => {
        // sort by: depth > objname > keyname > validator
        const aNesting = a.navkey.split('.').length;
        const bNesting = b.navkey.split('.').length;
        if (aNesting > bNesting) return 1;
        else if (aNesting < bNesting) return -1;
        else {
          if (a.navkey > b.navkey) return 1;
          else if (a.navkey < b.navkey) return -1;
          return fnScorer(b) - fnScorer(a);
        }
      });
  }

  /** Reduces a full set of instructions into a condensed test plan. */
  private static prepareTestPlan(instr: ValidationInstruction[]): ObjectTest[] {
    return instr.reduce((acc, cur) => {
      const lastDot = cur.navkey.lastIndexOf('.');
      const objKey = lastDot === -1 ? '' : cur.navkey.substring(0, lastDot);
      const priorObj = acc.filter((a) => a.navkey === objKey)[0];
      const workObj: ObjectTest = priorObj || {
        navkey: objKey,
        proto: cur.proto,
        trg: cur.trg,
        props: [],
      };
      const priorProp = workObj.props.filter((p) => p.key === cur.key)[0];
      const workProp: PropertyTest = priorProp || { key: cur.key, navkey: cur.navkey, fns: [] };
      workProp.fns.push(cur.fn);
      if (!priorProp) workObj.props.push(workProp);
      if (!priorObj) acc.push(workObj);
      return acc;
    }, [] as ObjectTest[]);
  }

  /** Executes test plan, mapping to a result. */
  private static executeTestPlan(tests: ObjectTest[]): ValidationResult[] {
    return tests.reduce((acc, cur) => {
      cur.props.forEach((p) => {
        for (let i = 0; i < p.fns.length; i++) {
          const output = p.fns[i](cur.trg, p.key, cur.proto);
          acc.push({ ...output, navkey: p.navkey });
          if (!output.valid && (p.fns[i] === RequiredValidator || p.fns[i] === TypeValidator)) {
            break; // stop if we've failed a terminating test
          }
        }
      });
      return acc;
    }, [] as ValidationResult[]);
  }

  /** Summarises a sequence of results. */
  private static summarise(results: ValidationResult[]): ValidationSummary {
    const retVal: ValidationSummary = { valid: results.every((r) => r.valid) };
    if (!retVal.valid) {
      retVal.errors = results
        .filter((r) => !r.valid)
        .reduce((acc, cur) => {
          acc[cur.navkey] = acc[cur.navkey] || [];
          acc[cur.navkey].push(cur.message);
          return acc;
        }, {} as Record<string, string[]>);
    }

    return retVal;
  }
}
