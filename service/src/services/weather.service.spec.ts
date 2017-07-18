import * as chai from 'chai';
import * as sinon from 'sinon';

import { DataPayload } from '../models/data-payload.model';
import { LocationApiData } from '../models/location-api-data.model';
import { LocationService } from './location.service';
import { StringService } from './string.service';
import { ValidationResult } from '../models/validation-result.model';
import { ValidationService } from './validation.service';
import { WeatherService } from './weather.service';

const passThrough = require('stream').PassThrough;
const weatherMockData = require('../data/weather.json');
const locationMockData = require('../data/location.json');

const assert = chai.assert;

let http = require('http');

describe('WeatherService', () => {
    let httpRequest: any;
    let zipCode = '12065';

    const mockValidationService = <ValidationService> {
        ValidateCoordinates(lat: string, long: string): Promise<ValidationResult> {
            return Promise.resolve(new ValidationResult());
        }
    };
    const mockLocationService = <LocationService> {
        GetLocation(zipCode: string): Promise<LocationApiData> {
            return Promise.resolve(<LocationApiData> {
                Location: locationMockData
            });
        }
    };
    const stringService = new StringService();
    const service = new WeatherService(mockValidationService, mockLocationService, stringService);

    it('Should Get Mock Weather Data', done => {
        httpRequest = sinon.stub(http, 'request');

        let response = new passThrough();
        response.write(JSON.stringify(weatherMockData));
        response.end();

        let request = new passThrough();
        httpRequest.callsArgWith(1, response).returns(request);

        service.GetWeather(zipCode).then((payload: DataPayload) => {
            httpRequest.called.should.be.equal(true);
            payload.should.not.be.empty;
            assert.deepEqual(payload.Weather, weatherMockData.main);

            done();
            http.request.restore();
        });
    });

    // Integration test
    // un-comment to run against the real API
    /*
    it('Should Get Real Weather Data', done => {
        service.GetWeather(zipCode).then((payload: DataPayload) => {
            payload.Location.zip_code.should.be.equal(zipCode);
            payload.should.not.be.empty;
            payload.Weather.should.not.be.empty;

            done();
        });
    });
    */
});
