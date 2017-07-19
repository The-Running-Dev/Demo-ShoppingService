import { Context } from 'aws-lambda';

import { ApiFailurePayload } from './models/api-failure-payload.model';
import { ApiSuccessPayload } from './models/api-success-payload.model';
import { DataPayload } from './models/data-payload.model';
import { ICallback } from './models/callback.model';
import { IEventPayload } from './models/event-payload.model';
import { LocationService } from './services/location.service';
import { ErrorType } from './models/error-type.enum';
import { ErrorTypeMessage } from './models/error-type-message.model';
import { StringService } from './services/string.service';
import { ValidationResult } from './models/validation-result.model';
import { ValidationService } from './services/validation.service';
import { WeatherService } from './services/weather.service';
import { WardrobeService } from './services/wordrobe.service';
import { ValidationError } from './models/validation-error.model';

// Given a ZipCode, it gets the current Weather
// and suggests an item based on the temperature
export function suggestWardrobe(payload: IEventPayload, context: Context, callback: ICallback) {
    let zipCode = (payload != null && payload.queryStringParameters != null) ? payload.queryStringParameters.ZipCode : '';
    let stringService = new StringService();
    let validationService = new ValidationService();
    let locationService = new LocationService(stringService);
    let weatherService = new WeatherService(validationService, locationService, stringService);
    let wardrobeService = new WardrobeService(weatherService);

    validationService.ValidateZipCode(zipCode).then((validationResult: ValidationResult) => {
        if (!validationResult.IsValid) {
            callback(null, new ApiFailurePayload(validationResult.Error));
            return;
        }

        wardrobeService.GetSuggestion(zipCode).then((data: DataPayload) => {
            data.Message = `How are things in ${data.Location.city}?`;
            data.Message += ` The current temperature is ${data.Weather.temp} degrees.`
            data.Message += ` ${data.WardrobeItem.Season} may we suggest ${data.WardrobeItem.Name}?`;

            callback(null, new ApiSuccessPayload(data));
        }).catch((e: any) => {
            let error = new ValidationError(ErrorTypeMessage.InvalidZipCode, ErrorType.InvalidZipCode);
            callback(null, new ApiFailurePayload(error));
        });
    });
}