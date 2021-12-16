"use strict";
var testing_1 = require("@angular/core/testing");
var product_details_component_1 = require("./product-details.component");
describe('About Component', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [product_details_component_1.ProductDetailsComponent] });
    });
    it('should ...', function () {
        var fixture = testing_1.TestBed.createComponent(product_details_component_1.ProductDetailsComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.children[0].textContent).toContain('ProductDetails');
    });
});
//# sourceMappingURL=product-details.component.spec.js.map