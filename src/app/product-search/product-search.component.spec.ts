import { TestBed } from '@angular/core/testing';

import { ProductsearchComponent } from './product-search.component';

describe('Product Search Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [ProductsearchComponent] });
    });

    it('should ...', () => {
        const fixture = TestBed.createComponent(ProductsearchComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.children[0].textContent).toContain('Product Search Component');
    });

});
