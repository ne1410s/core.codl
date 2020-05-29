import { log } from './custom';

@log
export class Greeter {
  constructor(public greeting: string) { }
}
