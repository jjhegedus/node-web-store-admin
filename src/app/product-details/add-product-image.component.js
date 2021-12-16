"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
require("rxjs/add/operator/switchMap");
var product_service_1 = require("../products/product.service");
var product_image_service_1 = require("./product-image.service");
var AddProductImageComponent = (function () {
    function AddProductImageComponent(productService, productImageService, route, location) {
        this.productService = productService;
        this.productImageService = productImageService;
        this.route = route;
        this.location = location;
    }
    AddProductImageComponent.prototype.ngOnInit = function () {
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
    AddProductImageComponent.prototype.goBack = function () {
        this.location.back();
    };
    AddProductImageComponent.prototype.save = function () {
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
    AddProductImageComponent.prototype.onImageChange = function (key) {
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
    AddProductImageComponent.prototype.upload = function (file, signed_request, url, done) {
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
    AddProductImageComponent.prototype.delete = function (file, signed_request, url, done) {
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
    AddProductImageComponent.prototype.deleteMainImage = function () {
        //this.productImageService.getDeleteMainImageAuthorizationHeader('image/jpeg', this.product.id)
        //    .subscribe((response) => this.afterGetDeleteMainImageAuthorizationHeader(response));
        var _this = this;
        this.productImageService.deleteMainImage(this.product.id)
            .subscribe(function () { return _this.afterDeleteMainImage(); });
    };
    AddProductImageComponent.prototype.afterGetDeleteMainImageAuthorizationHeader = function (response) {
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
    AddProductImageComponent.prototype.afterDeleteMainImage = function () {
        var mainImageElement = document.getElementById('mainImage');
        mainImageElement.src = '';
    };
    AddProductImageComponent.prototype.afterSignRequest = function (response) {
        this.upload(this.file, response.signed_request, response.url, this.afterFileUpload);
    };
    AddProductImageComponent.prototype.afterFileUpload = function (url) {
        var mainImageElement = document.getElementById('mainImage');
        mainImageElement.src = url + '?now=' + new Date().getTime();
    };
    AddProductImageComponent.prototype.getProductImages = function () {
        var _this = this;
        this.productImageService.getProductImages(this.product.id).subscribe(function (productImages) {
            _this.productImages = productImages;
            _this.mainImageUrl = _this.baseUrl + _this.productImages[0].Key;
            //window.alert('this.productImages.length = ' + this.productImages.length);
            //window.alert('this.productImages[0].Key = ' + this.productImages[0].Key);
        });
    };
    AddProductImageComponent.prototype.addImage = function () {
    };
    AddProductImageComponent.prototype.moveImageUp = function (imageId) {
        var _this = this;
        this.productImageService.moveImageUp(imageId)
            .subscribe(function (productImages) {
            _this.productImages = productImages;
            _this.mainImageUrl = _this.baseUrl + _this.productImages[0].Key;
        });
    };
    AddProductImageComponent.prototype.moveImageDown = function (imageId) {
        var _this = this;
        this.productImageService.moveImageDown(imageId)
            .subscribe(function (productImages) {
            _this.productImages = productImages;
            _this.mainImageUrl = _this.baseUrl + _this.productImages[0].Key;
        });
    };
    return AddProductImageComponent;
}());
AddProductImageComponent = __decorate([
    core_1.Component({
        selector: 'my-add-product-image',
        templateUrl: './add-product-image.component.html',
        styleUrls: ['./add-product-image.component.scss']
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        product_image_service_1.ProductImageService,
        router_1.ActivatedRoute,
        common_1.Location])
], AddProductImageComponent);
exports.AddProductImageComponent = AddProductImageComponent;
//# sourceMappingURL=add-product-image.component.js.map