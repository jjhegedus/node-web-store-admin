import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
//import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

//import { Product } from '../products/product';

@Injectable()
export class ProductImageService {
    title = 'Product Service';
    //private productImageUrl = 'http://localhost:8081/products/images'; // URL to web api
    private productImageUrl = 'http://ec2-34-207-115-234.compute-1.amazonaws.com/products/images'; // URL to web api   //private headers = new Headers({ 'Content-Type': 'application/json' });

    //private imagesUrl = 'https://s3.amazonaws.com/apgv-public-read/img/';
    //private productsUrl = 'http://localhost:8081/products';
    private productsUrl = 'http://ec2-34-207-115-234.compute-1.amazonaws.com/products'; // URL to web api

    constructor(private http: Http) { }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getMainImageSignature(fileType: string, productId: string): Observable<any> {
        const url = this.productImageUrl + "/sign?file_name=main.jpg&file_type=" + fileType + "&product_id=" + productId;
        return this.http.get(url).map(res => res.json());
    }

    getDeleteMainImageAuthorizationHeader(fileType: string, productId: string): Observable<any> {
        const url = this.productImageUrl + "/authorizationheader?file_name=main.jpg&file_type=" + fileType + "&product_id=" + productId;
        return this.http.get(url).map(res => res.json());
    }

    deleteMainImage(productId: string): Observable<any> {
        //const url = `${this.productImageUrl}/${product.id}`;
        const url = this.productImageUrl + "/main?file_name=main.jpg&product_id=" + productId;
        return this.http.delete(url).map(res => res.json()).catch(this.handleError);
    }

    getProductImages(productId: string): Observable<any> {
        const url = this.productsUrl + "/" + productId + "/images";
        return this.http.get(url).map(res => res.json()).catch(this.handleError);
    }

    //getProduct(id: string): Observable<Product> {
    //    const url = `${this.productsUrl}/${id}`;
    //    return this.http.get(url).map(res => res.json());
    //};

    upload(file: any, signed_request: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'x-amz-acl': 'public-read'
        });

        return this.http.put(
            signed_request,
            file,
            headers)
            .map(res => res.json());
    }

    moveImageUp(imageId: string): Observable<any> {
        var url = this.productImageUrl + "/" + imageId + "/move-up";
        return this.http.put(url, null).map(res => res.json());
    }

    moveImageDown(imageId: string): Observable<any> {
        var url = this.productImageUrl + "/" + imageId + "/move-down";
        return this.http.put(url, null).map(res => res.json());
    }

}
