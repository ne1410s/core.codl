import { created, subvert } from '../../src/index';

@created(c => console.log(c))
export class Greeter {
  constructor(public greeting: string) { }

  @subvert('subverted!')
  public makeGreeting(override: string): string {
    return 'hey, ' + (override || this.greeting);
  }
}

@created((c: GreeterMod) => c.greeting = 'subverted!')
export class GreeterMod {
  constructor(public greeting: string) {}
}