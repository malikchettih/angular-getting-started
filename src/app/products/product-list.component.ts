import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { IProduct, Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges, OnDestroy {
  pageTitle = 'Product List';
  imageWidth  = 50;
  imageMargin = 2;
  showImage = true;
  errorMessage: string;

  _listFilter: string;

  filtredProducts: IProduct[];
  products: IProduct[];

  constructor(private prodcuService: ProductService) {
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(filterValue: string) {
    this._listFilter = filterValue;
    this.filtredProducts = this._listFilter ? this.filterProducts(this._listFilter) : this.products;
  }

  ngOnInit(): void {
    console.log('ProductListComponent initialized');
    this.prodcuService.getProducts().subscribe(
      products => {

        this.products = products.map(
          product => new Product(product.productId,
            product.productName,
            product.productCode,
            product.releaseDate,
            product.description,
            product.price,
            product.starRating,
            product.imageUrl,
            product.discount)
        );

        this.filtredProducts = this.products;
        this.listFilter = 'cart';
      },
      error => this.errorMessage = <any> error
    );

  }

  ngOnChanges(): void {
    console.log('ProductListComponent changed');
  }

  ngOnDestroy(): void {
    console.log('ProductListComponent destroyed');
  }

  filterProducts(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy)!== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked (message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
