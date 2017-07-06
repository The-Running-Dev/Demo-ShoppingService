const http = require('http');

import { ILocation } from '../models/location.model';
import { ValidationService } from './validation.service';

export class LocationService {
    public validationService: ValidationService;

    constructor(validationService: ValidationService) {
        this.validationService = validationService;
    }

    public GetLocation(zipCode: string): Promise<ILocation> {
        const apiKey = `f1YvFlaLgkB2GP1hHmXSHELbanl0dzasA9Yfu91KuCNbrOs9bq2S4N3fapfoYqQz`;

        return new Promise((resolve: any, reject: any) => {
            this.validationService.ValidateZipCode(zipCode).then(() => {
                http.get({
                    host: `www.zipcodeapi.com/rest/${apiKey}`,
                    path: `/multi-info.json/${zipCode}/degrees`
                }, (response: any) => {
                    let body = '';
                    response.on('data', (d) => {
                        body += d;
                    });
                    response.on('end', () => {
                        resolve(<ILocation>(JSON.parse(body)));
                    });
                }).on('error', (response) => {
                    reject(response);
                });
            });
        });
    }
}