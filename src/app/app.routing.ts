import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { ProductCategoriesEditorComponent, ProductDetailsComponent, ProductAdminComponent } from '22ndtech-angular-lib';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'product-details/:id', component: ProductDetailsComponent },
    { path: 'product-categories', component: ProductCategoriesEditorComponent },
    { path: 'product-admin', component: ProductAdminComponent }
];

export const routing = RouterModule.forRoot(routes);
