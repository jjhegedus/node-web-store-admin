"use strict";
var core_1 = require('@angular/core');
var ConfigService = (function () {
    function ConfigService() {
        this.title = 'Config Service';
        this.configured = false;
        this.config = {};
        this.config.baseUrl = 'http://localhost:8081';
        //this.config.baseUrl = 'http://ec2-34-207-115-234.compute-1.amazonaws.com';
        this.config.awsBucket = 'https://s3.amazonaws.com/apgv-public-read/';
        this.configured = true;
    }
    ConfigService.prototype.getConfig = function (callback, configPath, initializationTime) {
        if (configPath === void 0) { configPath = ""; }
        if (initializationTime === void 0) { initializationTime = 0; }
        if (this.configured) {
            if (configPath) {
                callback(this.config);
            }
            else {
                callback(this.config);
            }
        }
        else {
            setTimeout(this.getConfig, 500, configPath, callback, initializationTime ? initializationTime : Date.now());
        }
    };
    ConfigService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map