"use strict";
var testing_1 = require("@angular/core/testing");
var products_component_1 = require("./products.component");
describe('About Component', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [products_component_1.ProductsComponent] });
    });
    it('should ...', function () {
        var fixture = testing_1.TestBed.createComponent(products_component_1.ProductsComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.children[0].textContent).toContain('These are the latest products going viral.');
    });
});
//# sourceMappingURL=products.component.spec.js.map