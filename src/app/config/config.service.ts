import { Injectable } from '@angular/core';


@Injectable()
export class ConfigService {
    title = 'Config Service';
    private configured: boolean;
    private config: any; // configuration data, at this point unconstrained JSON

    constructor() {
        this.configured = false;
        this.config = {};

        this.config.baseUrl = 'http://localhost:8081';
        //this.config.baseUrl = 'http://ec2-34-207-115-234.compute-1.amazonaws.com';
        this.config.awsBucket = 'https://s3.amazonaws.com/apgv-public-read/';

        this.configured = true;
    }

    getConfig(callback, configPath: string = "", initializationTime = 0): any {
        if (this.configured) {
            if (configPath) {
                callback(this.config);
            } else {
                callback(this.config);
            }
        } else {
            setTimeout(this.getConfig, 500, configPath, callback, initializationTime ? initializationTime : Date.now());
        }

    }

}
