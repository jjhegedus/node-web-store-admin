"use strict";
var testing_1 = require("@angular/core/testing");
var product_search_component_1 = require("./product-search.component");
describe('Product Search Component', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [product_search_component_1.ProductsearchComponent] });
    });
    it('should ...', function () {
        var fixture = testing_1.TestBed.createComponent(product_search_component_1.ProductsearchComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.children[0].textContent).toContain('Product Search Component');
    });
});
//# sourceMappingURL=product-search.component.spec.js.map