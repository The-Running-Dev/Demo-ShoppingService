import * as chai from 'chai';
import * as sinon from 'sinon';

import { ClothesService } from './services/clothes.service';
import { ErrorType } from './models/error-type.enum';
import { Suggest } from './shopping-service';
import { IEventPayload } from './models/payload.model';
import { IResponsePayload } from './models/response-payload.model';
import { ValidationError } from './models/validation-error.model';
import { ValidationService } from './services/validation.service';
import { ValidationResult } from './models/validation-result.model';
import { SummerItem } from './models/season-Items';

const weatherMockData = require('./data/weather.json');
const expect = chai.expect;

describe('Suggest', () => {
    let validationService: {};
    let clothesService: {};
    let mockResponse: IResponsePayload = {
        Message: 'Hooray!',
        Location: {
            city: 'Austin',
            state: 'TX',
            zip_code: '78748',
            lat: '',
            lng: ''
        },
        Weather: weatherMockData.list[0].main,
        WardrobeItem: new SummerItem('Sandals')
    };
    before(function () {
        validationService = sinon.stub(ValidationService, 'ValidateZipCode');
        clothesService = sinon.stub(ClothesService, 'GetSuggestion');
    });

    it('Should Return Error on Invalid Zip Code', done => {
        Suggest(null, null, (error: ValidationError) => {
            expect(error).to.not.be.undefined;
            expect(error.Type).to.be.equal(ErrorType.InvalidZipCode);

            done();
        });
    });

    it('Should Get a Valid Suggestion', done => {
        let payload: IEventPayload = {
            ZipCode: '12345'
        };

        Suggest(payload, null, (responsePayload: IResponsePayload) => {
            console.log(responsePayload);
            //expect(error).to.not.be.null;

            done();
        });
    });
});