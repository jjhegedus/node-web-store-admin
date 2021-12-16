import { InMemoryDbService } from 'angular-in-memory-web-api';
export class ProductsInMemoryDataService implements InMemoryDbService {
    createDb() {
        let products = [
            { id: 1, name: 'Cell Phone', description: 'Android cell phone', price: 399.99},
            { id: 2, name: 'Ear Buds', description: 'Blue Ear Buds', price: 14.99 },
            { id: 3, name: 'Necklace', description: 'Blue and Gold Necklace', price: 29.99 },
            { id: 4, name: 'Mortor and Pestle', description: 'Wooden Moror and Pestle', price: 9.99}
        ];
        return { products };
    }
}