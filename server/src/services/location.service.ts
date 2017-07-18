import { ValidationError } from '../models/validation-error.model';
const http = require('http');

import { ILocation } from '../models/location.model';
import { ZipCodeApi } from '../.env';
import { ErrorType, ErrorTypeMessage } from '../models/error-type.enums';

// Provides location related functions
// by leveraging the ZipCodeApi.com to get the location data
export class LocationService {
    public GetLocation(zipCode: string): Promise<ILocation> {
        return new Promise((resolve: any, reject: any) => {
            let api = new ZipCodeApi(zipCode);
            console.log(api.EndPoint);

            var req = http.get(api.EndPoint, (response: any) => {
                var data = '';
                response.on('data', (chunk: any) => {
                    data += chunk;
                });
                response.on('end', function () {
                    return resolve(<ILocation><any>JSON.parse(data));
                });
            }).on('error', (response: any) => {
                console.log(response);
                if (response.status == 404) {
                    return reject(new ValidationError(ErrorTypeMessage.InvalidZipCode, ErrorType.InvalidZipCode));
                }
                else {
                    return reject(new ValidationError(ErrorTypeMessage.Unknown, ErrorType.Unknown));
                }
            });

            req.end();
        });
    }
}