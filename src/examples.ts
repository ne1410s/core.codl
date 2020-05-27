import { log, logme } from './decorator/behaviour';

@log
export class LogDemo {
  constructor(public greeting: string) { }
}

@logme
export class LogMeDemo {
  constructor(public greeting: string) { }
}