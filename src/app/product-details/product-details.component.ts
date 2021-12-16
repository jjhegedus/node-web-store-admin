import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../config/config.service';
import { Product } from '../products/product';
import { ProductService } from '../products/product.service';
import { ProductImageService } from './product-image.service';
import { ProductImage } from './ProductImage';
//import { ConfigService } from '../config/config.service';

@Component({
    selector: 'my-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {
    product: Product;
    productId: string;
    productImages: Observable<ProductImage[]>;
    //productImages: ProductImage[];
    file: any;
    awsBucket: string;
    mainImageUrl: string;
    newProduct: boolean;
    private config: any;

    constructor(
        private configService: ConfigService,
        private productService: ProductService,
        private productImageService: ProductImageService,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.configService.getConfig(
            (config) => {
                this.config = config;

                this.awsBucket = this.config.awsBucket;
            });
    }

    ngOnInit() {
        console.log('product-details.component:ngOnInit()');
        this.route.params.filter((item) => { return item['id']; }).subscribe((next) => {
            if (next['id'] == 'NewProduct') {
                this.newProduct = true;

                this.product = new Product();
                this.productId = this.product.id;
            } else {
                this.productId = next['id'];
                this.newProduct = false;

                this.route.params.switchMap((params: Params) =>
                    this.productService.getProduct(params['id']))
                    .subscribe((product) => {
                        this.product = product;

                        //alert(this.configService.getConfig('test2'));
                        this.getProductImages();
                    });
            }
        });

    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        if (this.newProduct) {
            this.productService.createProduct(this.product).subscribe((product) => {
                this.product = product;
                this.goBack();
            });
        } else {
            this.productService.updateProduct(this.product)
                .subscribe(() => console.log('this.product.id = ' + this.product.id));

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
                    .subscribe((response) => this.afterSignRequest(response));
            }
        }
    }

    onMainImageChange(): void {
        let fileInputElement: any = document.getElementById("mainImagePicker");
        this.file = fileInputElement.files[0];
    }

    onImageChange(key: string): void {
        let fileInputElement: any = document.getElementById("imagePicker");
        this.file = fileInputElement.files[0];
        console.log('key = ' + key);
    }

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

    upload(file, signed_request, url, done) {
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", signed_request);
        xhr.setRequestHeader('x-amz-acl', 'public-read');
        xhr.onload = () => {
            if (xhr.status === 200) {
                done(url, this);
            } else if (xhr.status === 403) {
                this.delete(file, signed_request, url, done);
            }
        }
        xhr.send(file);
    }

    delete(file, signed_request, url, done) {
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", signed_request);
        xhr.onload = () => {
            if (xhr.status === 200) {
                this.upload(file, signed_request, url, done);
            }
        }
        xhr.send();
    }

    deleteMainImage() {
        //this.productImageService.getDeleteMainImageAuthorizationHeader('image/jpeg', this.product.id)
        //    .subscribe((response) => this.afterGetDeleteMainImageAuthorizationHeader(response));

        this.productImageService.deleteMainImage(this.product.id)
            .subscribe(() => this.afterDeleteMainImage());
    }

    afterGetDeleteMainImageAuthorizationHeader(response): void {
        const url = this.awsBucket + 'img/' + this.product.id + '/main.jpg?now=' + new Date().getTime();

        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", url);
        xhr.setRequestHeader('Authorization', response.Authorization);
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.onload = () => {
            if (xhr.status === 200) {
                let mainImageElement: any = document.getElementById('mainImage');
                mainImageElement.src = "";
            }
        }
        xhr.send();       
    }

    afterDeleteMainImage(): void {
        let mainImageElement: any = document.getElementById('mainImage');
        mainImageElement.src = '';
    }

    afterSignRequest(response): void {
        this.upload(this.file, response.signed_request, response.url, this.afterFileUpload);
    }

    afterFileUpload(url, thisObject): void {
        //let mainImageElement: any = document.getElementById('mainImage');
        //mainImageElement.src = url + '?now=' + new Date().getTime();
        console.log(url);
        thisObject.getProductImages();
        thisObject.location.replaceState(window.location.href);
    }

    getProductImages(): void {
        this.productImageService.getProductImages(this.product.id).subscribe(
            productImages => {
                this.productImages = productImages;

                if (this.productImages[0]) {
                    this.mainImageUrl = this.awsBucket + this.productImages[0].Key;
                }
            }
        );
    }

    addImageOld(): void {
        alert('add image');
        var inputFileElement = document.createElement('input');
        inputFileElement.type = 'file';
        inputFileElement.onchange = () => {
            alert('change');
            this.file = inputFileElement.files[0];
            alert('this.file.name = ' + this.file.name);
            this.productImageService.getImageSignature(this.file.name, this.file.type, this.product.id)
                .subscribe((response) => {
                    return this.afterSignRequest(response);
                });
        };
        inputFileElement.style.visibility = "hidden";

        document.body.appendChild(inputFileElement);
        inputFileElement.click();
    }

    addImage(): void {
        let addImageInputElement: any = document.getElementById("addImageInput");
        addImageInputElement.style.visibility = "visible";

        addImageInputElement.click();
    }

    imageAdded(): void {
        let addImageInputElement: any = document.getElementById("addImageInput");
        this.file = addImageInputElement.files[0];
        var fileName = prompt("Input image name", this.file.name);
        this.productImageService.getImageSignature(fileName, this.file.type, this.product.id)
            .subscribe((response) => {
                let addImageInputElement: any = document.getElementById("addImageInput");
                addImageInputElement.style.visibility = "hidden";
                return this.afterSignRequest(response);
            });
    }

    moveImageUp(imageId): void {
        this.productImageService.moveImageUp(imageId)
            .subscribe(productImages => {
                this.productImages = productImages;
                this.mainImageUrl = this.awsBucket + this.productImages[0].Key;
            });
    }

    moveImageDown(imageId): void {
        this.productImageService.moveImageDown(imageId)
            .subscribe(productImages => {
                this.productImages = productImages;
                this.mainImageUrl = this.awsBucket + this.productImages[0].Key;
            });

    }

    deleteImage(imageId): void {
        this.productImageService.delete(imageId)
            .subscribe(rawResponse => {
                if (rawResponse.ok) {
                    this.getProductImages();
                };
            });
    }
}
