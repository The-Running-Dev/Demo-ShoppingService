import * as chai from 'chai';
import * as sinon from 'sinon';

import { ILocation } from '../models/location.model';
import { LocationService } from './location.service';

const passThrough = require('stream').PassThrough;
const http = require('http');
const locationMockData = require('../data/location.json');

const assert = chai.assert;

describe('GetLocation', () => {
    let httpRequest: any;
    let zipCode = '12065';
    const service = new LocationService();

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

        service.GetLocation(zipCode).then((location: ILocation) => {
            httpRequest.called.should.be.equal(true);
            location.should.not.be.empty;
            assert.deepEqual(location, locationMockData);

            done();
        });
    });

    it('Should Pass Request Error to Callback', done => {
        var expected = 'error';
        var request = new passThrough();
        httpRequest.returns(request);

        service.GetLocation(zipCode).then(() => {
            console.log('success');
        }).catch((error: any) => {
            httpRequest.called.should.be.equal(true);
            assert.equal(error, expected);

            done();
        });

        request.emit('error', expected);
    });
});