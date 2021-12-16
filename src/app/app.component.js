"use strict";
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var _22ndtech_angular_lib_1 = require('22ndtech-angular-lib');
var _22ndtech_angular_lib_2 = require('22ndtech-angular-lib');
// import { ApiService } from './shared';
// import '../style/app.scss';
var AppComponent = (function () {
    function AppComponent(configService, productCategoriesService, contextService) {
        var _this = this;
        this.configService = configService;
        this.productCategoriesService = productCategoriesService;
        this.contextService = contextService;
        this.url = 'http://AllProductsGoneViral.com';
        this.currentPage = 'undefined';
        this.selectedCategory = new BehaviorSubject_1.BehaviorSubject('undefined');
        this.configService.getConfig(function (configuration) {
            _this.config = configuration;
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getProductCategories();
        this.categorySelectElement = document.getElementById('categorySelect');
        this.categorySelectElementChanges = Rx_1.Observable.fromEvent(this.categorySelectElement, 'change');
        this.categorySelectElementChanges.subscribe(function (event) { return _this.onSelectedElementChange(event); });
    };
    AppComponent.prototype.onSelectedElementChange = function (event) {
        // this.selectedCategory = this.categorySelectElement.options[this.categorySelectElement.selectedIndex].value;
        // this.contextService.setSelectedCategory(this.selectedCategory);
        this.selectedCategory.next(event.target.value);
        this.contextService.setSelectedCategory(event.target.value);
    };
    AppComponent.prototype.getProductCategories = function () {
        var _this = this;
        this.productCategoriesService.getProductCategories().subscribe(function (productCategories) {
            _this.productCategories = productCategories;
        });
    };
    AppComponent.prototype.componentAdded = function (component) {
        this.currentPage = component.pageName ? component.pageName : 'undefined';
        this.component = component;
        console.log(this.component);
    };
    AppComponent.prototype.componentRemoved = function (component) {
        console.log(component);
        this.currentPage = 'undefined';
        this.component = null;
        console.log('component is null');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss'],
        }), 
        __metadata('design:paramtypes', [_22ndtech_angular_lib_1.ConfigService, _22ndtech_angular_lib_1.ProductCategoriesService, _22ndtech_angular_lib_2.ContextService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map