const http = require('http');

import { ILocation } from '../models/location.model';
import { ZipCodeAPIKey } from '../.env';

// Provides location related functions
// by leveraging the ZipCodeApi.com to get the location data
export class LocationService {
    public GetLocation(zipCode: string): Promise<ILocation> {
        return new Promise((resolve: any, reject: any) => {
            var req = http.request({
                host: `www.zipcodeapi.com`,
                path: `/rest/${ZipCodeAPIKey}/info.json/${zipCode}/degree`
            }, (response: any) => {
                var data = '';
                response.on('data', (chunk: any) => {
                    data += chunk;
                });
                response.on('end', function () {
                    resolve(<ILocation><any>JSON.parse(data));
                });
            }).on('error', response => {
                reject(response);
            });

            req.end();
        });
    }
}