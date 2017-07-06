import { Context } from 'aws-lambda';

import { IEventPayload } from './models/payload.model';
import { ICallback } from './models/callback.model';
import { ValidationService } from './services/validation.service';

export function GetSuggestion(payload: IEventPayload, context: Context, callback: ICallback) {
    let input: IEventPayload = payload || {ZipCode: ''};
    let validationService = new ValidationService();

    validationService.ValidateZipCode(input.ZipCode).then(() => {
        callback(null, {
            Message: `Zip Code: ${input.ZipCode}`,
            Event: payload
        });
    });
}