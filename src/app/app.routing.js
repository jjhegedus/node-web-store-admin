"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var about_component_1 = require("./about/about.component");
var products_component_1 = require("./products/products.component");
var product_details_component_1 = require("./product-details/product-details.component");
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'products', component: products_component_1.ProductsComponent },
    { path: 'details/:id', component: product_details_component_1.ProductDetailsComponent }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map