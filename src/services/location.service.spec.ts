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
    let locationData = JSON.stringify(locationMockData);
    const service = new LocationService();

    before(function () {
        httpRequest = sinon.stub(http, 'request');
    });
    after(function () {
        http.request.restore();
    });

    it('Should Get Location Data', done => {
        let response = new passThrough();
        response.write(locationData);
        response.end();

        let request = new passThrough();
        httpRequest.callsArgWith(1, response).returns(request);

        service.GetLocation('12345').then((location: ILocation) => {
            httpRequest.called.should.be.equal(true);
            location.should.not.be.empty;
            assert.deepEqual(location, JSON.parse(locationData));

            done();
        });
    });

    /*
    it('should pass request error to callback', done => {
        var expected = 'error';
        var request = new passThrough();
        httpRequest.returns(request);

        service.GetLocation('12345').then(() => {
            console.log('success');
        }).catch((error: any) => {
            httpRequest.called.should.be.equal(true);
            assert.equal(error, expected);

            done(error);
        });

        request.emit('error', expected);
    });
    */
});