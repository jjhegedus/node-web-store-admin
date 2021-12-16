"use strict";
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
var rxjs_1 = require("rxjs");
var product_1 = require("../src/app/products/product");
//var Product = require('../src/app/products/product').Product;
var productsArray = [];
var product1 = new product_1.Product();
product1.id = "1";
product1.name = "Product1";
product1.description = "This is the first product";
product1.price = "$3.99";
var product2 = new product_1.Product();
product2.id = "2";
product2.name = "Product2";
product2.description = "This is the second product";
product2.price = "$4.99";
productsArray[0] = product1;
//var obArray: Observable<Product[]>;
var obArray = rxjs_1.Observable.from(productsArray);
obArray.subscribe(function (element) {
    console.log(element);
});
var arrayObservable = rxjs_1.Observable.create(function (observer) {
    console.log('observer = ' + observer);
});
console.log('arrayObserveable = ' + arrayObservable);
productsArray[1] = product2;
var arrayObserver = rxjs_1.Observable.from(productsArray).subscribe(function (next) {
    console.log('next = ' + next);
}, function (err) {
    console.log('err = ' + err);
}, function () {
    console.log('completed');
});
console.log(arrayObserver);
console.log('deploy-uat.ts: end');
//# sourceMappingURL=deploy-uat.js.map