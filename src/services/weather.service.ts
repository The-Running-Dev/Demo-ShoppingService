import { ILocation } from '../models/location.model';
const http = require('http');

import { IWeather } from '../models/weather.model';
import { LocationService } from './location.service';
import { OpenWeatherAPIKey } from '../.env';
import { ValidationService } from './validation.service';
import { IResponsePayload } from '../models/response-payload.model';

// Provides weather related functions
// by leveraging the OpenWeatherMap API
export class WeatherService {
    public validationService: ValidationService;
    public locationService: LocationService;

    constructor(validationService: ValidationService, locationService: LocationService) {
        this.validationService = validationService;
        this.locationService = locationService;
    }

    // Gets the current weather based on the provided zip code
    public GetWeather(zipCode: string): Promise<IResponsePayload> {
        return new Promise((resolve: any, reject: any) => {
            this.locationService.GetLocation(zipCode).then((location: ILocation) => {
                let payload: IResponsePayload = { Message: '', Location: location, WardrobeItem: null, Weather: null };

                this.validationService.ValidateCoordinates(location.lat, location.lng).then(() => {
                    var req = http.request({
                        host: `api.openweathermap.org`,
                        path: `//data/2.5/weather?lat=${location.lat}&lon=${location.lng}&units=imperial&appid=${OpenWeatherAPIKey}`
                    }, (response: any) => {
                        var data = '';
                        response.on('data', (chunk: any) => {
                            data += chunk;
                        });
                        response.on('end', function () {
                            let jsonData = <any>JSON.parse(data);
                            payload.Weather = <IWeather>(jsonData.list[0].main);

                            resolve(payload);
                        });
                    }).on('error', response => {
                        reject(response);
                    });

                    req.end();
                })
            })
        });
    }
}