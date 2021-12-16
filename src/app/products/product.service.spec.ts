import { inject, TestBed, async } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpModule } from '@angular/http';

//import 'rxjs/add/operator/toPromise';

//import { Product } from './product';

describe('Product Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [ProductService]
        });
    });


    it('The title of the service should be Product Serivce', inject([ProductService], (api) => {
        expect(api.title).toBe('Product Service');
    }));

    it('The productsUrl should be http://www.localhost:8081/products', inject([ProductService], (api) => {
        expect(api.productsUrl).toBe('http://www.localhost:8081/products');
    }));


    it('should support getting all products', async( inject([ProductService], (api) => {

        api.getProducts().subscribe(
            products => {
                console.log('products = ' + products);
                expect(products.length).toBe(4);
            });

    })));

    var productId = '58d6e1ce8f330b493d07d772';
    var returnedProduct;

    it('should support getting a single product by id', async(inject([ProductService], (api) => {

        api.getProduct(productId).subscribe(
            product => {
                console.log('product = ' + product);
                expect(product.name).toBe('Mortor and Pestle');
                returnedProduct = product;
            });

    })));


    it('should support updating a single product', async(inject([ProductService], (api) => {

        var updatedProduct = returnedProduct;
        updatedProduct.name = 'Mortor and Pestilence';

        api.updateProduct(updatedProduct).subscribe(
            product => {
                console.log('product = ' + product);
                expect(product.name).toBe('Mortor and Pestilence');
            });

    })));

    var createdProduct;

    it('should support creating a single product', async(inject([ProductService], (api) => {

        var newProduct = { id: null, name: 'Computer Mouse', description: 'Awesome computer mouse', price: '6.99' };

        api.createProduct(newProduct).subscribe(
            product => {
                console.log('product = ' + product);
                expect(product.name).toBe('Computer Mouse');
                createdProduct = product;
            });

    })));


    it('should support deleting a single product by id', async(inject([ProductService], (api) => {

        api.deleteProduct(createdProduct.id).subscribe(
            response => {
                console.log('response = ' + response);
                expect(response.message).toBe('Product id: ' + createdProduct.id + ' deleted successfully');
            });

    })));



});