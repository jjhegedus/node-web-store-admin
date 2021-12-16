"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var about_component_1 = require('./about/about.component');
var products_component_1 = require('./products/products.component');
var _22ndtech_angular_lib_1 = require('22ndtech-angular-lib');
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'products', component: products_component_1.ProductsComponent },
    { path: 'product-details/:id', component: _22ndtech_angular_lib_1.ProductDetailsComponent },
    { path: 'product-categories', component: _22ndtech_angular_lib_1.ProductCategoriesEditorComponent },
    { path: 'product-admin', component: _22ndtech_angular_lib_1.ProductAdminComponent }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map