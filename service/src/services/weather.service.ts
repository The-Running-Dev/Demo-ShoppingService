import { OpenWeatherApiSettings } from '../api/open-weather-api-settings.model';

const http = require('http');

import { DataPayload } from '../models/data-payload.model';
import { ILocation } from '../models/location.model';
import { IWeather } from '../models/weather.model';
import { LocationService } from './location.service';
import { ErrorType } from '../models/error-type.enum';
import { ErrorTypeMessage } from '../models/error-type-message.model';
import { StringService } from './string.service';
import { ValidationError } from '../models/validation-error.model';
import { ValidationService } from './validation.service';
import { LocationApiData } from '../models/location-api-data.model';

// Provides Weather related functions
// by leveraging the OpenWeatherMap API
export class WeatherService {
    public validationService: ValidationService;
    public locationService: LocationService;

    constructor(validationService: ValidationService, locationService: LocationService, stringService: StringService) {
        this.validationService = validationService;
        this.locationService = locationService;
        this._stringService = stringService;
    }

    // Gets the current Weather based on the provided zip code
    public GetWeather(zipCode: string): Promise<DataPayload> {
        return new Promise((resolve: any, reject: any) => {
            this.locationService.GetLocation(zipCode).then((locationApiData: LocationApiData) => {
                let location = locationApiData.Location;
                let payload = new DataPayload(null, location);
                let apiUrl = this._stringService.Format(OpenWeatherApiSettings.EndPointUrl, OpenWeatherApiSettings.ApiKey, location.lat, location.lng);

                this.validationService.ValidateCoordinates(location.lat, location.lng).then(() => {
                    let req = http.get(apiUrl, (response: any) => {
                        let data = '';
                        response.on('data', (chunk: any) => {
                            data += chunk;
                        });
                        response.on('end', function () {
                            let jsonData = <any>JSON.parse(data);
                            payload.Weather = <IWeather>(jsonData.main);
                            return resolve(payload);
                        });
                    }).on('error', response => {
                        return reject(new ValidationError(ErrorTypeMessage.CouldNotGetWeather, ErrorType.CouldNotGetWeather));
                    });

                    req.end();
                });
            }).catch((error: any) => {
                return reject(error);
            });
        });
    }

    private _stringService: StringService;
}