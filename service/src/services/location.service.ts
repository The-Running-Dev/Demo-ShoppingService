import { LocationApiData } from '../models/location-api-data.model';

const http = require('http');

import { ILocation } from '../models/location.model';
import { ErrorType } from '../models/error-type.enum';
import { ErrorTypeMessage } from '../models/error-type-message.model';
import { StringService } from './string.service';
import { ValidationError } from '../models/validation-error.model';
import { ZipCodeApiSettings } from '../api/zip-code-api-settings.model';

// Provides location related functions
// by leveraging the ZipCodeApi.com to get the location data
export class LocationService {
    public constructor(stringService: StringService) {
        this._stringService = stringService;
    }

    public GetLocation(zipCode: string): Promise<LocationApiData> {
        return new Promise((resolve: any, reject: any) => {
            let apiUrl = this._stringService.Format(ZipCodeApiSettings.EndPointUrl, ZipCodeApiSettings.ApiKey, zipCode);

            let request = http.get(apiUrl, (response: any) => {
                let data = '';
                response.on('data', (chunk: any) => {
                    data += chunk;
                });
                response.on('end', function () {
                    return resolve(<LocationApiData> {
                        Location: <ILocation><any>JSON.parse(data)
                    });
                });
            }).on('error', () => {
                return reject(<LocationApiData> {
                    Error: new ValidationError(ErrorTypeMessage.InvalidZipCode, ErrorType.InvalidZipCode)
                });
            });

            request.end();
        });
    }

    private _stringService: StringService;
}