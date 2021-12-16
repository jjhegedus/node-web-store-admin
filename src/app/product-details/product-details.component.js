"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
require("rxjs/add/operator/switchMap");
var product_service_1 = require("../products/product.service");
var product_image_service_1 = require("./product-image.service");
var ProductDetailsComponent = (function () {
    function ProductDetailsComponent(productService, productImageService, route, location) {
        this.productService = productService;
        this.productImageService = productImageService;
        this.route = route;
        this.location = location;
    }
    ProductDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('product-details.component:ngOnInit()');
        this.route.params.switchMap(function (params) {
            return _this.productService.getProduct(params['id']);
        })
            .subscribe(function (product) {
            _this.product = product;
            _this.baseUrl = 'https://s3.amazonaws.com/apgv-public-read/';
            _this.getProductImages();
        });
    };
    ProductDetailsComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProductDetailsComponent.prototype.save = function () {
        var _this = this;
        this.productService.updateProduct(this.product)
            .subscribe(function () { return console.log('this.product.id = ' + _this.product.id); });
        if (this.file) {
            //window.alert('this.file.name = ' + this.file.name + '\r' + 'this.file.type = ' + this.file.type);
            //this.signRequest(this.file, this.afterSignRequest);
            var mainImageElement = document.getElementById('mainImage');
            if (mainImageElement.src) {
                this.productImageService.deleteMainImage(this.product.id)
                    .subscribe(function () {
                    var mainImageElement = document.getElementById('mainImage');
                    mainImageElement.src = '';
                    _this.productImageService.getMainImageSignature(_this.file.type, _this.product.id)
                        .subscribe(function (response) { return _this.afterSignRequest(response); });
                });
            }
            this.productImageService.getMainImageSignature(this.file.type, this.product.id)
                .subscribe(function (response) { return _this.afterSignRequest(response); });
        }
    };
    ProductDetailsComponent.prototype.onMainImageChange = function () {
        var fileInputElement = document.getElementById("mainImagePicker");
        this.file = fileInputElement.files[0];
    };
    ProductDetailsComponent.prototype.onImageChange = function (key) {
        var fileInputElement = document.getElementById("imagePicker");
        this.file = fileInputElement.files[0];
        console.log('key = ' + key);
    };
    //signRequest(file, done): void{
    //    var xhr = new XMLHttpRequest();
    //    xhr.open("GET", "/sign?file_name" + file.name + "&file_type" + file.type);
    //    xhr.onreadystatechange = function () {
    //        if (xhr.readyState === 4 && xhr.status === 200) {
    //            let response = JSON.parse(xhr.responseText);
    //            done(response);
    //        }
    //    }
    //    xhr.send();
    //}
    ProductDetailsComponent.prototype.upload = function (file, signed_request, url, done) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", signed_request);
        xhr.setRequestHeader('x-amz-acl', 'public-read');
        xhr.onload = function () {
            if (xhr.status === 200) {
                done(url);
            }
            else if (xhr.status === 403) {
                _this.delete(file, signed_request, url, done);
            }
        };
        xhr.send(file);
    };
    ProductDetailsComponent.prototype.delete = function (file, signed_request, url, done) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", signed_request);
        xhr.onload = function () {
            if (xhr.status === 200) {
                _this.upload(file, signed_request, url, done);
            }
        };
        xhr.send();
    };
    ProductDetailsComponent.prototype.deleteMainImage = function () {
        //this.productImageService.getDeleteMainImageAuthorizationHeader('image/jpeg', this.product.id)
        //    .subscribe((response) => this.afterGetDeleteMainImageAuthorizationHeader(response));
        var _this = this;
        this.productImageService.deleteMainImage(this.product.id)
            .subscribe(function () { return _this.afterDeleteMainImage(); });
    };
    ProductDetailsComponent.prototype.afterGetDeleteMainImageAuthorizationHeader = function (response) {
        var url = 'https://apgv-public-read.s3.amazonaws.com/img/' + this.product.id + '/main.jpg?now=' + new Date().getTime();
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url);
        xhr.setRequestHeader('Authorization', response.Authorization);
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.onload = function () {
            if (xhr.status === 200) {
                var mainImageElement = document.getElementById('mainImage');
                mainImageElement.src = "";
            }
        };
        xhr.send();
    };
    ProductDetailsComponent.prototype.afterDeleteMainImage = function () {
        var mainImageElement = document.getElementById('mainImage');
        mainImageElement.src = '';
    };
    ProductDetailsComponent.prototype.afterSignRequest = function (response) {
        this.upload(this.file, response.signed_request, response.url, this.afterFileUpload);
    };
    ProductDetailsComponent.prototype.afterFileUpload = function (url) {
        var mainImageElement = document.getElementById('mainImage');
        mainImageElement.src = url + '?now=' + new Date().getTime();
    };
    ProductDetailsComponent.prototype.getProductImages = function () {
        var _this = this;
        this.productImageService.getProductImages(this.product.id).subscribe(function (productImages) {
            _this.productImages = productImages;
            _this.mainImageUrl = _this.baseUrl + _this.productImages[0].Key;
            //window.alert('this.productImages.length = ' + this.productImages.length);
            //window.alert('this.productImages[0].Key = ' + this.productImages[0].Key);
        });
    };
    ProductDetailsComponent.prototype.addImage = function () {
    };
    ProductDetailsComponent.prototype.moveImageUp = function (imageId) {
        var _this = this;
        this.productImageService.moveImageUp(imageId)
            .subscribe(function (productImages) {
            _this.productImages = productImages;
            _this.mainImageUrl = _this.baseUrl + _this.productImages[0].Key;
        });
    };
    ProductDetailsComponent.prototype.moveImageDown = function (imageId) {
        var _this = this;
        this.productImageService.moveImageDown(imageId)
            .subscribe(function (productImages) {
            _this.productImages = productImages;
            _this.mainImageUrl = _this.baseUrl + _this.productImages[0].Key;
        });
    };
    return ProductDetailsComponent;
}());
ProductDetailsComponent = __decorate([
    core_1.Component({
        selector: 'my-product-details',
        templateUrl: './product-details.component.html',
        styleUrls: ['./product-details.component.scss']
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        product_image_service_1.ProductImageService,
        router_1.ActivatedRoute,
        common_1.Location])
], ProductDetailsComponent);
exports.ProductDetailsComponent = ProductDetailsComponent;
//# sourceMappingURL=product-details.component.js.map