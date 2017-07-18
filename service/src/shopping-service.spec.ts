import * as sinon from 'sinon';

import { suggestWardrobe } from './shopping-service';

import { ApiFailurePayload } from './models/api-failure-payload.model';
import { DataPayload } from './models/data-payload.model';
import { ErrorTypeMessage } from './models/error-type-message.model';
import { IEventPayload } from './models/event-payload.model';
import { ApiPayload } from './models/api-payload.model';
import { IQueryParameters } from './models/query-parameters.model';
import { ValidationService } from './services/validation.service';
import { ValidationResult } from './models/validation-result.model';
import { SummerItem } from './models/season-item,models';
import { WardrobeService } from './services/wordrobe.service';
import { ValidationError } from './models/validation-error.model';
import { ErrorType } from './models/error-type.enum';
import { LocationApiData } from './models/location-api-data.model';

const weatherMockData = require('./data/weather.json');

describe('Suggest', () => {
    let mockResponse: DataPayload = {
        Message: 'Hooray!',
        Location: {
            city: 'Austin',
            state: 'TX',
            zip_code: '78748',
            lat: '',
            lng: ''
        },
        Weather: weatherMockData.main,
        WardrobeItem: new SummerItem('some sandals')
    };

    it('Should Return Error on Empty Zip Code', done => {
        suggestWardrobe(null, null, (error: any, payload: ApiFailurePayload) => {
            payload.body.should.not.be.empty;
            payload.body.should.contain(ErrorTypeMessage.InvalidZipCode);

            done();
        });
    });

    it('Should Return Error on Invalid Zip Code', done => {
        let eventPayload: IEventPayload = {
            method: 'get',
            queryStringParameters: <IQueryParameters>{ ZipCode: '99999' }
        };

        suggestWardrobe(eventPayload, null, (error: any, payload: ApiFailurePayload) => {
            payload.body.should.not.be.empty;
            payload.body.should.contain(ErrorTypeMessage.InvalidZipCode);

            done();
        });
    });

    it('Should Get a Valid Suggestion', done => {
        let validateZipStub = sinon.stub(ValidationService.prototype, 'ValidateZipCode').resolves(new ValidationResult());
        let getSuggestionStub = sinon.stub(WardrobeService.prototype, 'GetSuggestion').resolves(mockResponse);

        let payload: IEventPayload = {
            method: 'get',
            queryStringParameters: <IQueryParameters>{ ZipCode: '1245' }
        };

        suggestWardrobe(payload, null, (error: any, response: ApiPayload) => {
            response.should.not.be.null;
            response.body.should.not.be.empty;

            done();

            validateZipStub.restore();
            getSuggestionStub.restore();
        });
    });
});