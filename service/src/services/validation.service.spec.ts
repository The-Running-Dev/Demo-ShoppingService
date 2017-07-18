import * as chai from 'chai';

import { ErrorType } from '../models/error-type.enum';
import { ValidationResult } from '../models/validation-result.model';
import { ValidationService } from './validation.service';

const expect = chai.expect;

describe('ValidationService', () => {
    const service = new ValidationService();

    it('Should Return an Error on No Zip Code', done => {
        service.ValidateZipCode(null).then((result: ValidationResult) => {
            expect(result).to.not.be.null;
            expect(result.IsValid).to.be.false;
            expect(result.Error.Type).to.equal(ErrorType.InvalidZipCode);

            done();
        })
    });

    it('Should Return Error on Empty Zip Code', done => {
        service.ValidateZipCode('').then((result: ValidationResult) => {
            expect(result).to.not.be.null;
            expect(result.IsValid).to.be.false;
            expect(result.Error.Type).to.be.equal(ErrorType.InvalidZipCode);

            done();
        });
    });

    it('Should Return Error If Zip Code is Less than 5 numbers', done => {
        service.ValidateZipCode('1234').then((result: ValidationResult) => {
            expect(result).to.not.be.null;
            expect(result.IsValid).to.be.false;
            expect(result.Error.Type).to.be.equal(ErrorType.InvalidZipCode);

            done();
        });
    });

    it('Should Return Error If Zip Code is Not Numbers', done => {
        service.ValidateZipCode('abcd').then((result: ValidationResult) => {
            expect(result).to.not.be.null;
            expect(result.IsValid).to.be.false;
            expect(result.Error.Type).to.be.equal(ErrorType.InvalidZipCode);

            done();
        });
    });

    it('Should Validate If Zip Code is 5 Numbers', done => {
        service.ValidateZipCode('12345').then((result: ValidationResult) => {
            expect(result.IsValid).to.be.true;
            expect(result.Error).to.be.null;
            done();
        });
    });

    it('Should Validate If Zip Code is Extended Zip Code', done => {
        service.ValidateZipCode('12345-1234').then((result: ValidationResult) => {
            expect(result.IsValid).to.be.true;
            expect(result.Error).to.be.null;
            done();
        });
    });

    it('Should Return an Error on Invalid Coordinates', done => {
        service.ValidateCoordinates('1234', '1234').then((result: ValidationResult) => {
            expect(result).to.not.be.null;
            expect(result.IsValid).to.be.false;
            expect(result.Error.Type).to.equal(ErrorType.InvalidCoordinates);
            done();
        });
    });

    it('Should Return an Error on Empty Latitude', done => {
        service.ValidateCoordinates(null, '90').then((result: ValidationResult) => {
            expect(result).to.not.be.null;
            expect(result.IsValid).to.be.false;
            expect(result.Error.Type).to.equal(ErrorType.InvalidLatitude);
            done();
        })
    });

    it('Should Return an Error on Empty Longitude', done => {
        service.ValidateCoordinates('90', null).then((result: ValidationResult) => {
            expect(result).to.not.be.null;
            expect(result.IsValid).to.be.false;
            expect(result.Error.Type).to.equal(ErrorType.InvalidLongitude);
            done();
        })
    });

    it('Should Resolve on Valid Coordinates', done => {
        service.ValidateCoordinates('+90', '-180').then((result: ValidationResult) => {
            expect(result).to.not.be.null;
            expect(result.IsValid).to.be.true;
            expect(result.Error).to.be.null;
            done();
        });
    });
});
