import { ILocation } from '../models/location.model';
const http = require('http');

import { ApiPayload } from '../models/api-payload.model';
import { IWeather } from '../models/weather.model';
import { LocationService } from './location.service';
import { OpenWeatherApi } from '../.env';
import { ValidationService } from './validation.service';
import { ErrorType, ErrorTypeMessage } from '../models/error-type.enums';
import { ValidationError } from '../models/validation-error.model';

// Provides Weather related functions
// by leveraging the OpenWeatherMap API
export class WeatherService {
    public validationService: ValidationService;
    public locationService: LocationService;

    constructor(validationService: ValidationService, locationService: LocationService) {
        this.validationService = validationService;
        this.locationService = locationService;
    }

    // Gets the current Weather based on the provided zip code
    public GetWeather(zipCode: string): Promise<ApiPayload> {
        return new Promise((resolve: any, reject: any) => {
            this.locationService.GetLocation(zipCode).then((location: ILocation) => {
                let payload = new ApiPayload(null, location);
                let api = new OpenWeatherApi(zipCode);

                this.validationService.ValidateCoordinates(location.lat, location.lng).then(() => {
                    var req = http.get(api.EndPoint, (response: any) => {
                        var data = '';
                        response.on('data', (chunk: any) => {
                            data += chunk;
                        });
                        response.on('end', function () {
                            let jsonData = <any>JSON.parse(data);
                            payload.Weather = <IWeather>(jsonData.main);
                            return resolve(payload);
                        });
                    }).on('error', response => {
                        if (response.status == 404) {
                            return reject(new ValidationError(ErrorTypeMessage.CouldNotGetWeather, ErrorType.CouldNotGetWeather));
                        }
                        else {
                            return reject(new ValidationError(ErrorTypeMessage.Unknown, ErrorType.Unknown));
                        }
                    });

                    req.end();
                });
            }).catch((error: any) => {
                return reject(error);
            });
        });
    }
}