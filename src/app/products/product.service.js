"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var config_service_1 = require('../config/config.service');
var ProductService = (function () {
    function ProductService(http, configService) {
        var _this = this;
        this.http = http;
        this.configService = configService;
        this.title = 'Product Service';
        //private productsUrl = 'http://ec2-34-207-115-234.compute-1.amazonaws.com/products'; // URL to web api
        //private productsUrl = 'http://localhost:8081/products'; // URL to web api
        this.productsUrl = '';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.configService = configService;
        this.configService.getConfig(function (config) {
            _this.config = config;
            _this.productsUrl = _this.config.baseUrl + '/products';
            _this.getProducts();
        });
    }
    ProductService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ProductService.prototype.getProducts = function () {
        return this.http.get(this.productsUrl).map(function (res) { return res.json(); });
    };
    ProductService.prototype.getProduct = function (id) {
        var url = this.productsUrl + "/" + id;
        try {
            return this.http.get(url).map(function (res) { return res.json(); });
        }
        catch (err) {
            window.alert('Error in product.service.ts: getProduct: err = ' + err);
        }
    };
    ;
    ProductService.prototype.updateProduct = function (product) {
        var url = this.productsUrl + "/" + product.id;
        return this.http.put(url, JSON.stringify(product), {
            headers: this.headers
        }).map(function (res) { return res.json(); });
    };
    ProductService.prototype.createProduct = function (product) {
        return this.http.post(this.productsUrl, JSON.stringify(product), {
            headers: this.headers
        }).map(function (res) { return res.json(); });
    };
    ProductService.prototype.deleteProduct = function (id) {
        var url = this.productsUrl + "/" + id;
        return this.http.delete(url).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ;
    ProductService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, config_service_1.ConfigService])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map