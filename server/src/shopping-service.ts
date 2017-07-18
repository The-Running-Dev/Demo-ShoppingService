import { Context } from 'aws-lambda';

import { ApiPayload } from './models/api-payload.model';
import { ICallback } from './models/callback.model';
import { IEventPayload } from './models/payload.model';
import { IResponsePayload } from './models/response-payload.model';
import { LocationService } from './services/location.service';
import { ValidationResult } from './models/validation-result.model';
import { ValidationService } from './services/validation.service';
import { WeatherService } from './services/weather.service';
import { WardrobeService } from './services/wordrobe.service';

// Given a ZipCode, it gets the current Weather
// and suggests an item based on the temperature
export function suggestWardrobe(payload: IEventPayload, context: Context, callback: ICallback) {
    let zipCode = (payload != null && payload.queryStringParameters != null) ? payload.queryStringParameters.ZipCode : '';
    let validationService = new ValidationService();
    let locationService = new LocationService();
    let wardrobeService = new WardrobeService(new WeatherService(validationService, locationService));

    validationService.ValidateZipCode(zipCode).then((validationResult: ValidationResult) => {
        if (!validationResult.IsValid) {
            let payload: IResponsePayload = {
                statusCode: 400,
                body: validationResult.Error.Message,
                headers: {"Access-Control-Allow-Origin": "*"}
            };
            callback(null, payload);
            return;
        }

        wardrobeService.GetSuggestion(zipCode).then((apiPayload: ApiPayload) => {
            apiPayload.Message = `How are things in ${apiPayload.Location.city}?`;
            apiPayload.Message += ` The current temperature is ${apiPayload.Weather.temp} degrees.`
            apiPayload.Message += ` ${apiPayload.WardrobeItem.Season} may we suggest ${apiPayload.WardrobeItem.Name}?`;

            let payload: IResponsePayload = {
                statusCode: 200,
                body: JSON.stringify(apiPayload),
                headers: {"Access-Control-Allow-Origin": "*"}
            };

            callback(null, payload);
        }).catch((error: any) => {
            let payload: IResponsePayload = {
                statusCode: 400,
                body: JSON.stringify(error),
                headers: {"Access-Control-Allow-Origin": "*"}
            };
            callback(null, payload);
        });
    });
}