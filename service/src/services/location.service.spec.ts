import * as chai from 'chai';
import * as sinon from 'sinon';

import { LocationApiData } from "src/models/location-api-data.model";
import { LocationService } from './location.service';
import { StringService } from './string.service';

const passThrough = require('stream').PassThrough;
const locationMockData = require('../data/location.json');
const http = require('http');
const assert = chai.assert;

describe('GetLocation', () => {
    let httpRequest: any;
    let zipCode = '12065';
    const stringService = new StringService();
    const service = new LocationService(stringService);

    before(function () {
        httpRequest = sinon.stub(http, 'request');
    });
    after(function () {
        http.request.restore();
    });

    it('Should Get Mock Location Data', done => {
        let response = new passThrough();
        response.write(JSON.stringify(locationMockData));
        response.end();

        let request = new passThrough();
        httpRequest.callsArgWith(1, response).returns(request);

        service.GetLocation(zipCode).then((apiData: LocationApiData) => {
            httpRequest.called.should.be.equal(true);
            apiData.Location.should.not.be.empty;
            assert.deepEqual(apiData.Location, locationMockData);

            done();
        });
    });

    it('Should Pass Request Error to Callback', done => {
        var expected = 'error';
        var request = new passThrough();
        httpRequest.returns(request);

        service.GetLocation(zipCode).catch((error: any) => {
            httpRequest.called.should.be.equal(true);
            assert.equal(error, expected);
        });

        request.emit('error', expected);

        done();
    });
});
