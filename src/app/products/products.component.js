"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var product_service_1 = require('./product.service');
var config_service_1 = require('../config/config.service');
var ProductsComponent = (function () {
    function ProductsComponent(productService, router, configService) {
        this.productService = productService;
        this.router = router;
        this.configService = configService;
    }
    ProductsComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('ProductsComponent:ngOnInit()');
        this.configService.getConfig(function (config) {
            _this.config = config;
            _this.getProducts();
        });
    };
    ProductsComponent.prototype.getProducts = function () {
        var _this = this;
        //window.alert('products.components.ts: getProducts(): Begin');
        this.productService.getProducts().subscribe(function (products) {
            _this.products = products;
        });
    };
    ProductsComponent.prototype.onSelect = function (product) {
        this.selectedProduct = product;
    };
    ProductsComponent.prototype.deleteProduct = function (product) {
        var _this = this;
        this.productService.deleteProduct(product.id).subscribe(function () {
            _this.products = _this.products.filter(function (p) { return p !== product; });
            if (_this.selectedProduct === product) {
                _this.selectedProduct = null;
            }
        });
    };
    ProductsComponent.prototype.addProduct = function () {
        this.router.navigate(['/details', 'NewProduct']);
    };
    ProductsComponent.prototype.gotoDetail = function (id) {
        this.router.navigate(['/details', id]);
    };
    ProductsComponent = __decorate([
        core_1.Component({
            selector: 'my-products',
            templateUrl: './products.component.html',
            styleUrls: ['./products.component.scss']
        }), 
        __metadata('design:paramtypes', [product_service_1.ProductService, router_1.Router, config_service_1.ConfigService])
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=products.component.js.map