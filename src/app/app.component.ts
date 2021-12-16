import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ConfigService, ProductCategoriesService } from '22ndtech-angular-lib';
import { ProductCategory, ContextService } from '22ndtech-angular-lib';

// import { ApiService } from './shared';

// import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  url = 'http://AllProductsGoneViral.com';
  title: string;

  private config: any;
  private currentPage: string = 'undefined';
  productCategories: ProductCategory[];
  private selectedCategory: BehaviorSubject<string> = new BehaviorSubject<string>('undefined');
  private component: any;
  categoryChanges: Observable<string>;
  categorySelectElement: HTMLSelectElement;
  categorySelectElementChanges: Observable<string>;

  constructor(
    private configService: ConfigService,
    private productCategoriesService: ProductCategoriesService,
    private contextService: ContextService) {

    this.configService.getConfig((configuration: any) => {
      this.config = configuration;
    });
  }

  ngOnInit() {
    this.getProductCategories();

    this.categorySelectElement = <HTMLSelectElement>document.getElementById('categorySelect');

    this.categorySelectElementChanges = Observable.fromEvent(
      this.categorySelectElement, 'change'
    );

    this.categorySelectElementChanges.subscribe(
      event => this.onSelectedElementChange(event));

  }

  onSelectedElementChange(event: any) {
    // this.selectedCategory = this.categorySelectElement.options[this.categorySelectElement.selectedIndex].value;

    // this.contextService.setSelectedCategory(this.selectedCategory);

    this.selectedCategory.next(event.target.value);
    this.contextService.setSelectedCategory(event.target.value);
  }

  getProductCategories(): void {
    this.productCategoriesService.getProductCategories().subscribe(
      productCategories => {
        this.productCategories = productCategories;
      });
  }


  componentAdded(component: any) {
    this.currentPage = component.pageName ? component.pageName : 'undefined';
    this.component = component;
    console.log(this.component);
  }

  componentRemoved(component: any) {
    console.log(component);
    this.currentPage = 'undefined';
    this.component = null;
    console.log('component is null');
  }

}
