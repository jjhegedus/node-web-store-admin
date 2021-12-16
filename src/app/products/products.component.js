"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var product_service_1 = require("./product.service");
var ProductsComponent = (function () {
    function ProductsComponent(productService, router) {
        this.productService = productService;
        this.router = router;
    }
    ProductsComponent.prototype.ngOnInit = function () {
        console.log('ProductsComponent:ngOnInit()');
        this.getProducts();
    };
    ProductsComponent.prototype.getProducts = function () {
        var _this = this;
        //window.alert('products.components.ts: getProducts(): Begin');
        this.productService.getProducts().subscribe(function (products) {
            _this.products = products;
            //window.alert('products.components.ts: getProducts(): Iside Lambda');
            //window.alert('products = ' + products);
            //window.alert('JSON.stringify(products) = ' + JSON.stringify(products));
        });
    };
    ProductsComponent.prototype.onSelect = function (product) {
        this.selectedProduct = product;
    };
    ProductsComponent.prototype.deleteProducts = function (product) {
        var _this = this;
        this.productService.deleteProduct(product.id).subscribe(function () {
            _this.products = _this.products.filter(function (p) { return p !== product; });
            if (_this.selectedProduct === product) {
                _this.selectedProduct = null;
            }
        });
    };
    ProductsComponent.prototype.gotoDetail = function (id) {
        this.router.navigate(['/details', id]);
    };
    return ProductsComponent;
}());
ProductsComponent = __decorate([
    core_1.Component({
        selector: 'my-products',
        templateUrl: './products.component.html',
        styleUrls: ['./products.component.scss']
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        router_1.Router])
], ProductsComponent);
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=products.component.js.map