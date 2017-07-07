import * as chai from 'chai';
import * as sinon from 'sinon';

import { suggestWardrobe } from './shopping-service';

import { WardrobeService } from './services/wordrobe.service';
import { ErrorType, ErrorTypeMessage } from './models/error-type.enum';
import { IEventPayload } from './models/payload.model';
import { IResponsePayload } from './models/response-payload.model';
import { ValidationError } from './models/validation-error.model';
import { ValidationService } from './services/validation.service';
import { ValidationResult } from './models/validation-result.model';
import { SummerItem } from './models/season-Items';

const weatherMockData = require('./data/weather.json');
const expect = chai.expect;

describe('Suggest', () => {
    let mockResponse: IResponsePayload = {
        Message: 'Hooray!',
        Location: {
            city: 'Austin',
            state: 'TX',
            zip_code: '78748',
            lat: '',
            lng: ''
        },
        Weather: weatherMockData.main,
        WardrobeItem: new SummerItem('Sandals')
    };

    it('Should Return Error on Invalid Zip Code', done => {
        suggestWardrobe(null, null, (error: ValidationError) => {
            expect(error).to.not.be.undefined;
            expect(error).to.be.equal(ErrorTypeMessage.InvalidZipCode);

            done();
        });
    });

    it('Should Get a Valid Suggestion', done => {
        sinon.stub(ValidationService, 'ValidateZipCode').resolves(new ValidationResult());
        sinon.stub(WardrobeService, 'GetSuggestion').resolves(mockResponse);

        let payload: IEventPayload = {
            ZipCode: '1245'
        };

        suggestWardrobe(payload, null, (responsePayload: IResponsePayload) => {
            expect(responsePayload).to.not.be.null;

            done();
        });
    });
});