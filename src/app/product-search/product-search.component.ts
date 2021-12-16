import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductsearchComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('ProductSearchComponent:ngOnInit()');
  }

}
