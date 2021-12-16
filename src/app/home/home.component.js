"use strict";
var core_1 = require('@angular/core');
var _22ndtech_angular_lib_1 = require('22ndtech-angular-lib');
var HomeComponent = (function () {
    function HomeComponent(cartService) {
        this.cartService = cartService;
        this.pageName = 'Home';
        console.log(this.cartService);
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'my-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        }), 
        __metadata('design:paramtypes', [_22ndtech_angular_lib_1.CartService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map