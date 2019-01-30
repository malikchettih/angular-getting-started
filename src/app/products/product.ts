export interface IProduct {

  productId: number;
  productName: string;
  productCode: string;
  releaseDate: Date;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
  discount: number;
}

export class Product implements IProduct {

  constructor(
    public productId: number,
    public productName: string,
    public productCode: string,
    public releaseDate: Date,
    public description: string,
    public price: number,
    public starRating: number,
    public imageUrl: string,
    public discount: number) {

  }

  public calculateDiscount(): number {
    return (1 - this.discount) * this.price;
  }
}
