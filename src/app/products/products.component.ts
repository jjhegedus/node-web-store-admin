import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from './product';
import { ProductService } from './product.service';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'my-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

    products: Product[];
    selectedProduct: Product;
    config: any;

    constructor(
        private productService: ProductService,
        private router: Router,
        private configService: ConfigService
    ) {
  }

  ngOnInit(): void {
      console.log('ProductsComponent:ngOnInit()');
      this.configService.getConfig(
          (config) => {
              this.config = config;
              this.getProducts();
          });
    }

  getProducts(): void {
      //window.alert('products.components.ts: getProducts(): Begin');
      this.productService.getProducts().subscribe(
          products => {
              this.products = products;
          });
  }

  onSelect(product: Product): void {
      this.selectedProduct = product;
  }

  deleteProduct(product: Product): void {
      this.productService.deleteProduct(product.id).subscribe(
          () => {
              this.products = this.products.filter(p => p !== product);
              if (this.selectedProduct === product) {
                  this.selectedProduct = null;
              }
          });
  }

  addProduct(): void {
      this.router.navigate(['/details', 'NewProduct']);
  }

  gotoDetail(id: string): void {
      this.router.navigate(['/details', id]);
  }

}
