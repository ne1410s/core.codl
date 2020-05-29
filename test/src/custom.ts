import { expose } from '../../src/decorator/instance';
import { InstanceDecorator } from '../../src/decorator/types';

/** Logs to console any new instances of the class. */
export const log: InstanceDecorator = ctor => expose(ctor, item => {
  console.log('decorator logger:', item);
});
