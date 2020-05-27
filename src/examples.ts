import { BehaviorDecorators } from './decorator/behaviour'

/** A sealed memo. */
@BehaviorDecorators.Sealed
export class SealedMemo {
  constructor(public greeting: string) { }
}

/** A memo. */
export class Memo {
  constructor(public greeting: string) { }
}
