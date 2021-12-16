import { TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';

describe('About Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [ProductDetailsComponent] });
    });

    it('should ...', () => {
        const fixture = TestBed.createComponent(ProductDetailsComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.children[0].textContent).toContain('ProductDetails');
    });

});
