import { Metadata, ReflectMetadata } from '../../../src/index';

export class MetadataTestModel {

  private _price: number = 12.4534;

  @Metadata.format((x: number) => `£${x.toFixed(2)}`)
  public get price() { return this._price; }
  public set price(value: number) { this._price = value; }
  public get priceFormatted() { 
    return ReflectMetadata.getFormatted(this, 'price');
  }

  @Metadata.description('woot')
  public testMe: any;
  public get testMeDescription(): string {
    return ReflectMetadata.getDescription(this, 'testMe');
  }

  @Metadata.displayName('bar')
  public testMeToo: string = 'foo';
  public get testMeTooDisplayName(): string {
    return ReflectMetadata.getDisplayName(this, 'testMeToo');
  }
}
