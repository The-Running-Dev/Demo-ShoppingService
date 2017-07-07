import * as chai from 'chai';
import * as sinon from 'sinon';

import { ValidationResult } from '../models/validation-result.model';
import { WeatherService } from './weather.service';
import { ValidationService } from './validation.service';
import { LocationService } from './location.service';
import { ILocation } from '../models/location.model';
import { IResponsePayload } from '../models/response-payload.model';

const passThrough = require('stream').PassThrough;
const http = require('http');
const weatherMockData = require('../data/weather.json');
const locationMockData = require('../data/location.json');

const assert = chai.assert;

describe('WeatherService', () => {
    let httpRequest: any;
    let weatherData = weatherMockData;

    const mockValidationService = <ValidationService> {
        ValidateCoordinates(lat: string, long: string): Promise<ValidationResult> {
            return Promise.resolve(new ValidationResult());
        }
    };
    const mockLocationService = <LocationService> {
        GetLocation(zipCode: string): Promise<ILocation> {
            return Promise.resolve(<ILocation>locationMockData);
        }
    };
    const service = new WeatherService(mockValidationService, mockLocationService);

    before(function () {
        httpRequest = sinon.stub(http, 'request');
    });
    after(function () {
        http.request.restore();
    });

    it('Should Get Weather Data', done => {
        let response = new passThrough();
        response.write(JSON.stringify(weatherData));
        response.end();

        let request = new passThrough();
        httpRequest.callsArgWith(1, response).returns(request);

        service.GetWeather('12345').then((payload: IResponsePayload) => {
            httpRequest.called.should.be.equal(true);
            payload.should.not.be.empty;
            assert.deepEqual(payload.Weather, weatherData.list[0].main);

            done();
        });
    });
});