import * as chai from 'chai';
import * as sinon from 'sinon';

import { ValidationError } from '../models/validation-error.model';
import { LocationService } from './location.service';
import { ILocation } from '../models/location.model';
import { ValidationService } from './validation.service';
import { request } from 'http';
var proxyquire = require('proxyquire');
const locationMockData = require('../data/location.json');

const expect = chai.expect;
const assert = chai.assert;

describe('GetLocation', () => {
    const mockValidationService = <ValidationService> {
        ValidateZipCode(zipCode: string): Promise<ValidationError> {
            return null;
        }
    };
    const service = new LocationService(mockValidationService);
    let server: any;

    var twitstat;
    var request;

    before(function () {
        request = sinon.stub();
        twitstat = proxyquire('../lib/twitstat', {'request': request});
    });

    before(function () {
        server = sinon.fakeServer.create();
    });

    after(function () {
        server.restore();
    });

    it('Should Get Location Data', done => {
        var callback = sinon.spy();
        console.log(server);

        server.requests[0].respond(
            200,
            {"Content-Type": "application/json"},
            JSON.stringify(locationMockData)
        );

        service.GetLocation('12345').then((location: ILocation) => {
            console.log(location);
            done();
        });

        assert(callback.calledOnce);
    });

    it('should report a LOW popularity when given url is shared less than 10 times', function (done) {
        var expectedEndpoint = 'http://urls.api.twitter.com/1/urls/count.json?url=some-url.com';
        var body = JSON.stringify({
            count: 9,
            url: "http://some-url.com/"
        });
        request.arguments(expectedEndpoint).yields(null, null, body);

        twitstat.getPopularity('some-url.com', function (err, data) {
            expect(err).to.be.null;
            expect(data).to.equal(JSON.stringify({
                "url": "http://some-url.com/",
                "popularity": "LOW"
            }));
            done();
        });
    });

    /*
    it('Should Fail to Get Location Data', done => {
        service.GetLocation(null).then((location: ILocation) => {
            done();
        })
    });
    */
});