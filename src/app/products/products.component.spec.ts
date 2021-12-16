import { TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';

describe('About Component', () => {
  beforeEach(() => {
      TestBed.configureTestingModule({ declarations: [ProductsComponent]});
  });

  it('should ...', () => {
      const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('These are the latest products going viral.');
  });

});
