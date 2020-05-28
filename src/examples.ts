import { log } from './decorator/behaviour';

@log
export class LogDemo {
  constructor(public greeting: string) { }
}
