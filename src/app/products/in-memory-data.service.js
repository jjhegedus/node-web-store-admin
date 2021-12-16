"use strict";
var ProductsInMemoryDataService = (function () {
    function ProductsInMemoryDataService() {
    }
    ProductsInMemoryDataService.prototype.createDb = function () {
        var products = [
            { id: 1, name: 'Cell Phone', description: 'Android cell phone', price: 399.99 },
            { id: 2, name: 'Ear Buds', description: 'Blue Ear Buds', price: 14.99 },
            { id: 3, name: 'Necklace', description: 'Blue and Gold Necklace', price: 29.99 },
            { id: 4, name: 'Mortor and Pestle', description: 'Wooden Moror and Pestle', price: 9.99 }
        ];
        return { products: products };
    };
    return ProductsInMemoryDataService;
}());
exports.ProductsInMemoryDataService = ProductsInMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map