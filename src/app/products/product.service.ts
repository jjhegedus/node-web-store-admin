import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ConfigService } from '../config/config.service';
import { Product } from './product';

@Injectable()
export class ProductService {
    title = 'Product Service';
    //private productsUrl = 'http://ec2-34-207-115-234.compute-1.amazonaws.com/products'; // URL to web api
    //private productsUrl = 'http://localhost:8081/products'; // URL to web api
    private productsUrl = '';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private config: any;


    constructor(
        private http: Http,
        private configService: ConfigService) {

        this.configService = configService;

        this.configService.getConfig(
            (config) => {
                this.config = config;

                this.productsUrl = this.config.baseUrl + '/products';

                this.getProducts();
            });
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getProducts(): Observable<Product[]> {

        return this.http.get(this.productsUrl).map(res => res.json());
    }

    getProduct(id: string): Observable<Product> {
        const url = `${this.productsUrl}/${id}`;
        try {
            return this.http.get(url).map(res => res.json());
        }
        catch (err) {
            window.alert('Error in product.service.ts: getProduct: err = ' + err);
        }
    };

    updateProduct(product: Product): Observable<Product> {
        const url = `${this.productsUrl}/${product.id}`;

        return this.http.put(
            url,
            JSON.stringify(product),
            {
                headers: this.headers
            }
        ).map(res => res.json());
    }

    createProduct(product: Product): Observable<Product> {

        return this.http.post(
            this.productsUrl,
            JSON.stringify(product),
            {
                headers: this.headers
            }
        ).map(res => res.json());
    }

    deleteProduct(id: string): Observable<any> {
        const url = `${this.productsUrl}/${id}`;
        return this.http.delete(url).map(res => res.json()).catch(this.handleError);
    };

}
