"use strict";
var testing_1 = require('@angular/core/testing');
var product_service_1 = require('./product.service');
var http_1 = require('@angular/http');
//import 'rxjs/add/operator/toPromise';
//import { Product } from './product';
describe('Product Service', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                http_1.HttpModule
            ],
            providers: [product_service_1.ProductService]
        });
    });
    it('The title of the service should be Product Serivce', testing_1.inject([product_service_1.ProductService], function (api) {
        expect(api.title).toBe('Product Service');
    }));
    it('The productsUrl should be http://www.localhost:8081/products', testing_1.inject([product_service_1.ProductService], function (api) {
        expect(api.productsUrl).toBe('http://www.localhost:8081/products');
    }));
    it('should support getting all products', testing_1.async(testing_1.inject([product_service_1.ProductService], function (api) {
        api.getProducts().subscribe(function (products) {
            console.log('products = ' + products);
            expect(products.length).toBe(4);
        });
    })));
    var productId = '58d6e1ce8f330b493d07d772';
    var returnedProduct;
    it('should support getting a single product by id', testing_1.async(testing_1.inject([product_service_1.ProductService], function (api) {
        api.getProduct(productId).subscribe(function (product) {
            console.log('product = ' + product);
            expect(product.name).toBe('Mortor and Pestle');
            returnedProduct = product;
        });
    })));
    it('should support updating a single product', testing_1.async(testing_1.inject([product_service_1.ProductService], function (api) {
        var updatedProduct = returnedProduct;
        updatedProduct.name = 'Mortor and Pestilence';
        api.updateProduct(updatedProduct).subscribe(function (product) {
            console.log('product = ' + product);
            expect(product.name).toBe('Mortor and Pestilence');
        });
    })));
    var createdProduct;
    it('should support creating a single product', testing_1.async(testing_1.inject([product_service_1.ProductService], function (api) {
        var newProduct = { id: null, name: 'Computer Mouse', description: 'Awesome computer mouse', price: '6.99' };
        api.createProduct(newProduct).subscribe(function (product) {
            console.log('product = ' + product);
            expect(product.name).toBe('Computer Mouse');
            createdProduct = product;
        });
    })));
    it('should support deleting a single product by id', testing_1.async(testing_1.inject([product_service_1.ProductService], function (api) {
        api.deleteProduct(createdProduct.id).subscribe(function (response) {
            console.log('response = ' + response);
            expect(response.message).toBe('Product id: ' + createdProduct.id + ' deleted successfully');
        });
    })));
});
//# sourceMappingURL=product.service.spec.js.map