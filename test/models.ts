import { log } from './src/custom';

@log
export class Greeter {
  constructor(public greeting: string) { }
}
