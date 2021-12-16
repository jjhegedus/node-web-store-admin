"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
//import { Http } from '@angular/http';
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var config_service_1 = require('../config/config.service');
//import { Product } from '../products/product';
var ProductImageService = (function () {
    function ProductImageService(http, configService) {
        var _this = this;
        this.http = http;
        this.configService = configService;
        this.title = 'Product Service';
        //private productImageUrl = 'http://localhost:8081/products/images'; // URL to web api
        //private productImageUrl = 'http://ec2-34-207-115-234.compute-1.amazonaws.com/products/images'; // URL to web api   //private headers = new Headers({ 'Content-Type': 'application/json' });
        //private imagesUrl = 'https://s3.amazonaws.com/apgv-public-read/img/';
        //private productsUrl = 'http://localhost:8081/products'
        //private productsUrl = 'http://ec2-34-207-115-234.compute-1.amazonaws.com/products';
        this.productsUrl = '';
        this.productImageUrl = '';
        this.configService.getConfig(function (config) {
            _this.config = config;
            _this.productsUrl = _this.config.baseUrl + '/products';
            _this.productImageUrl = _this.config.baseUrl + '/products/images';
        });
    }
    ProductImageService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ProductImageService.prototype.getMainImageSignature = function (fileType, productId) {
        var url = this.productImageUrl + "/sign?file_name=main.jpg&file_type=" + fileType + "&product_id=" + productId;
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    ProductImageService.prototype.getImageSignature = function (fileName, fileType, productId) {
        var url = this.productImageUrl + "/sign?file_name=" + fileName + "&file_type=" + fileType + "&product_id=" + productId;
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    ProductImageService.prototype.getDeleteMainImageAuthorizationHeader = function (fileType, productId) {
        var url = this.productImageUrl + "/authorizationheader?file_name=main.jpg&file_type=" + fileType + "&product_id=" + productId;
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    ProductImageService.prototype.deleteMainImage = function (productId) {
        //const url = `${this.productImageUrl}/${product.id}`;
        var url = this.productImageUrl + "/main?file_name=main.jpg&product_id=" + productId;
        return this.http.delete(url).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ProductImageService.prototype.getProductImages = function (productId) {
        var url = this.productsUrl + "/" + productId + "/images";
        return this.http.get(url).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    //getProduct(id: string): Observable<Product> {
    //    const url = `${this.productsUrl}/${id}`;
    //    return this.http.get(url).map(res => res.json());
    //};
    ProductImageService.prototype.upload = function (file, signed_request) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'x-amz-acl': 'public-read'
        });
        return this.http.put(signed_request, file, headers)
            .map(function (res) { return res.json(); });
    };
    ProductImageService.prototype.moveImageUp = function (imageId) {
        var url = this.productImageUrl + "/" + imageId + "/move-up";
        return this.http.put(url, null).map(function (res) { return res.json(); });
    };
    ProductImageService.prototype.moveImageDown = function (imageId) {
        var url = this.productImageUrl + "/" + imageId + "/move-down";
        return this.http.put(url, null).map(function (res) { return res.json(); });
    };
    ProductImageService.prototype.delete = function (imageId) {
        var url = this.productImageUrl + "/" + imageId;
        return this.http.delete(url, null).map(function (res) { return res.json(); });
    };
    ProductImageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, config_service_1.ConfigService])
    ], ProductImageService);
    return ProductImageService;
}());
exports.ProductImageService = ProductImageService;
//# sourceMappingURL=product-image.service.js.map