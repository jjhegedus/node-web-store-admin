import { Component } from '@angular/core';

import { CartService } from '22ndtech-angular-lib';

@Component({
    selector: 'my-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    pageName: string = 'Home';

    constructor(
        private cartService: CartService
    ) {
        console.log(this.cartService);

    }


}