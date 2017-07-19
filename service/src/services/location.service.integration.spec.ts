// Integration tests for LocationService, uncomment to run

/*
import { ErrorType } from '../models/error-type.enum';
import { ErrorTypeMessage } from '../models/error-type-message.model';
import { LocationApiData } from '../models/location-api-data.model';
import { LocationService } from './location.service';
import { StringService } from './string.service';

describe('GetLocation', () => {
    const stringService = new StringService();
    const service = new LocationService(stringService);

    it('Should Respond with Error on Invalid Zip Code', done => {
        service.GetLocation('99999').catch((apiData: LocationApiData) => {
            apiData.Error.should.not.be.empty;
            apiData.Error.Type.should.be.equal(ErrorType.InvalidZipCode);
            apiData.Error.Message.should.be.equal(ErrorTypeMessage.InvalidZipCode);

            done();
        });
    });

    it('Should Respond with Valid Data on Valid Zip Code', done => {
        service.GetLocation('12345').then((apiData: LocationApiData) => {
            apiData.Location.should.not.be.empty;
            apiData.Error.should.not.be.empty;

            done();
        });
    });
});
*/