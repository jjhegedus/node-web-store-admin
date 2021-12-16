"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
require('rxjs/add/operator/switchMap');
var config_service_1 = require('../config/config.service');
var product_1 = require('../products/product');
var product_service_1 = require('../products/product.service');
var product_image_service_1 = require('./product-image.service');
//import { ConfigService } from '../config/config.service';
var ProductDetailsComponent = (function () {
    function ProductDetailsComponent(configService, productService, productImageService, route, location) {
        var _this = this;
        this.configService = configService;
        this.productService = productService;
        this.productImageService = productImageService;
        this.route = route;
        this.location = location;
        this.configService.getConfig(function (config) {
            _this.config = config;
            _this.awsBucket = _this.config.awsBucket;
        });
    }
    ProductDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('product-details.component:ngOnInit()');
        this.route.params.filter(function (item) { return item['id']; }).subscribe(function (next) {
            if (next['id'] == 'NewProduct') {
                _this.newProduct = true;
                _this.product = new product_1.Product();
                _this.productId = _this.product.id;
            }
            else {
                _this.productId = next['id'];
                _this.newProduct = false;
                _this.route.params.switchMap(function (params) {
                    return _this.productService.getProduct(params['id']);
                })
                    .subscribe(function (product) {
                    _this.product = product;
                    //alert(this.configService.getConfig('test2'));
                    _this.getProductImages();
                });
            }
        });
    };
    ProductDetailsComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProductDetailsComponent.prototype.save = function () {
        var _this = this;
        if (this.newProduct) {
            this.productService.createProduct(this.product).subscribe(function (product) {
                _this.product = product;
                _this.goBack();
            });
        }
        else {
            this.productService.updateProduct(this.product)
                .subscribe(function () { return console.log('this.product.id = ' + _this.product.id); });
            if (this.file) {
                //window.alert('this.file.name = ' + this.file.name + '\r' + 'this.file.type = ' + this.file.type);
                //this.signRequest(this.file, this.afterSignRequest);
                //let mainImageElement: any = document.getElementById('mainImage');
                //if (mainImageElement.src) {
                //    this.productImageService.deleteMainImage(this.product.id)
                //        .subscribe(() => {
                //            let mainImageElement: any = document.getElementById('mainImage');
                //            mainImageElement.src = '';
                //            this.productImageService.getMainImageSignature(this.file.type, this.product.id)
                //                .subscribe((response) => this.afterSignRequest(response))
                //        });
                //}
                this.productImageService.getMainImageSignature(this.file.type, this.product.id)
                    .subscribe(function (response) { return _this.afterSignRequest(response); });
            }
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
                done(url, _this);
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
        var url = this.awsBucket + 'img/' + this.product.id + '/main.jpg?now=' + new Date().getTime();
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
    ProductDetailsComponent.prototype.afterFileUpload = function (url, thisObject) {
        //let mainImageElement: any = document.getElementById('mainImage');
        //mainImageElement.src = url + '?now=' + new Date().getTime();
        console.log(url);
        thisObject.getProductImages();
        thisObject.location.replaceState(window.location.href);
    };
    ProductDetailsComponent.prototype.getProductImages = function () {
        var _this = this;
        this.productImageService.getProductImages(this.product.id).subscribe(function (productImages) {
            _this.productImages = productImages;
            if (_this.productImages[0]) {
                _this.mainImageUrl = _this.awsBucket + _this.productImages[0].Key;
            }
        });
    };
    ProductDetailsComponent.prototype.addImageOld = function () {
        var _this = this;
        alert('add image');
        var inputFileElement = document.createElement('input');
        inputFileElement.type = 'file';
        inputFileElement.onchange = function () {
            alert('change');
            _this.file = inputFileElement.files[0];
            alert('this.file.name = ' + _this.file.name);
            _this.productImageService.getImageSignature(_this.file.name, _this.file.type, _this.product.id)
                .subscribe(function (response) {
                return _this.afterSignRequest(response);
            });
        };
        inputFileElement.style.visibility = "hidden";
        document.body.appendChild(inputFileElement);
        inputFileElement.click();
    };
    ProductDetailsComponent.prototype.addImage = function () {
        var addImageInputElement = document.getElementById("addImageInput");
        addImageInputElement.style.visibility = "visible";
        addImageInputElement.click();
    };
    ProductDetailsComponent.prototype.imageAdded = function () {
        var _this = this;
        var addImageInputElement = document.getElementById("addImageInput");
        this.file = addImageInputElement.files[0];
        var fileName = prompt("Input image name", this.file.name);
        this.productImageService.getImageSignature(fileName, this.file.type, this.product.id)
            .subscribe(function (response) {
            var addImageInputElement = document.getElementById("addImageInput");
            addImageInputElement.style.visibility = "hidden";
            return _this.afterSignRequest(response);
        });
    };
    ProductDetailsComponent.prototype.moveImageUp = function (imageId) {
        var _this = this;
        this.productImageService.moveImageUp(imageId)
            .subscribe(function (productImages) {
            _this.productImages = productImages;
            _this.mainImageUrl = _this.awsBucket + _this.productImages[0].Key;
        });
    };
    ProductDetailsComponent.prototype.moveImageDown = function (imageId) {
        var _this = this;
        this.productImageService.moveImageDown(imageId)
            .subscribe(function (productImages) {
            _this.productImages = productImages;
            _this.mainImageUrl = _this.awsBucket + _this.productImages[0].Key;
        });
    };
    ProductDetailsComponent.prototype.deleteImage = function (imageId) {
        var _this = this;
        this.productImageService.delete(imageId)
            .subscribe(function (rawResponse) {
            if (rawResponse.ok) {
                _this.getProductImages();
            }
            ;
        });
    };
    ProductDetailsComponent = __decorate([
        core_1.Component({
            selector: 'my-product-details',
            templateUrl: './product-details.component.html',
            styleUrls: ['./product-details.component.scss']
        }), 
        __metadata('design:paramtypes', [config_service_1.ConfigService, product_service_1.ProductService, product_image_service_1.ProductImageService, router_1.ActivatedRoute, common_1.Location])
    ], ProductDetailsComponent);
    return ProductDetailsComponent;
}());
exports.ProductDetailsComponent = ProductDetailsComponent;
//# sourceMappingURL=product-details.component.js.map