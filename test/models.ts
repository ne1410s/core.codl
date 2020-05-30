import { created } from '../src/index';

@created(c => console.log(c))
export class Greeter {
  constructor(public greeting: string) { }
}

@created((c: GreeterMod) => c.greeting = 'subverted!')
export class GreeterMod {
  constructor(public greeting: string) {}
}