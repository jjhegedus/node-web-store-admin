console.log('deploy-uat.ts: start');




//console.log('process.cwd() = ' + process.cwd());
//var fs = require('fs');
//fs.writeFile("tmp/test.txt", "Hey there!", function (err) {
//    if (err) {
//        return console.log(err);
//    }

//    console.log("The file was saved");
//});
//var cpm = require('child_process');


// -- using a dos batch file -- //
// -- Issues:  I don't seem to get stdout --//
//cpm.execFile(
//    'cmd',
//    ['/c', 'start', '""', '.\\tools\\deploy-uat.bat'],
//    {},
//    (error, stdout, stderr) => {
//        console.log(
//            'error = ' + error + '\n\n'
//            + 'stdout = ' + stdout + '\n\n'
//            + 'stderr = ' + stderr + '\n\n'
//        );
//    });
// -- END: using a dos batch file -- //



//var cmd = 'echo "this is a test"; echo "this is another test"';

//cpm.exec(
//    cmd,
//    {},
//    (error, stdout, stderr) => {
//        console.log(
//            'error = ' + error + '\n\n'
//            + 'stdout = ' + stdout + '\n\n'
//            + 'stderr = ' + stderr + '\n\n'
//        );
//    });

//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';

import { Product } from '../src/app/products/product';
//var Product = require('../src/app/products/product').Product;

var productsArray: Product[] = [];
let product1 = new Product();
product1.id = "1";
product1.name = "Product1";
product1.description = "This is the first product";
product1.price = "$3.99";


let product2 = new Product();
product2.id = "2";
product2.name = "Product2";
product2.description = "This is the second product";
product2.price = "$4.99";

productsArray[0] = product1;



//var obArray: Observable<Product[]>;
var obArray = Observable.from(productsArray);

obArray.subscribe((element) => {
    console.log(element);
});

var arrayObservable = Observable.create((observer) => {
    console.log('observer = ' + observer);
});

console.log('arrayObserveable = ' + arrayObservable);

productsArray[1] = product2;

var arrayObserver = Observable.from(productsArray).subscribe(
    (next) => {
        console.log('next = ' + next);
    },
    (err) => {
        console.log('err = ' + err);
    },
    () => {
        console.log('completed');
    });

console.log(arrayObserver);

console.log('deploy-uat.ts: end');
