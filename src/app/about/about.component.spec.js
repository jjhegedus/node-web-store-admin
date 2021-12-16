"use strict";
var testing_1 = require("@angular/core/testing");
var about_component_1 = require("./about.component");
describe('About Component', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [about_component_1.AboutComponent] });
    });
    it('should ...', function () {
        var fixture = testing_1.TestBed.createComponent(about_component_1.AboutComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.children[0].textContent).toContain('All Products Gone Viral is a new product company focused on trending products that are about to go viral giving you a single location to find and purchase all of the products you need at the best prices on the web.');
    });
});
//# sourceMappingURL=about.component.spec.js.map