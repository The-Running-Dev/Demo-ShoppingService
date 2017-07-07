import { Context } from 'aws-lambda';

import { WardrobeService } from './services/wordrobe.service';
import { ICallback } from './models/callback.model';
import { IEventPayload } from './models/payload.model';
import { IResponsePayload } from './models/response-payload.model';
import { LocationService } from './services/location.service';
import { ValidationResult } from './models/validation-result.model';
import { ValidationService } from './services/validation.service';
import { WeatherService } from './services/weather.service';

// Given a ZipCode, it gets the current weather
// and suggests an item based on the temperature
export function suggestWordrobe(payload: IEventPayload, context: Context, callback: ICallback) {
    let input: IEventPayload = (payload != null) ? payload : {ZipCode: ''};
    let validationService = new ValidationService();
    let locationService = new LocationService();
    let clothsService = new WardrobeService(new WeatherService(validationService, locationService));

    validationService.ValidateZipCode(input.ZipCode).then((validationResult: ValidationResult) => {
        if (!validationResult.IsValid) {
            callback(validationResult.Error.Message, null);

            return;
        }

        clothsService.GetSuggestion(input.ZipCode).then((payload: IResponsePayload) => {
            payload.Message = `How are things in ${payload.Location.city}?`;
            payload.Message += ` The current temperature is ${payload.Weather.temp} degrees.`
            payload.Message += ` ${payload.WardrobeItem.Season}, may we suggest ${payload.WardrobeItem.Name}`;

            callback(null, payload);
        });
    });
}