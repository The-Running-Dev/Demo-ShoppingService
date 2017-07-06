import * as chai from 'chai';

import { ValidationError } from '../models/validation-error.model';
import { ValidationService } from './validation.service';
import { ErrorType } from '../models/error-type.enum';

const expect = chai.expect;
const assert = chai.assert;

describe('ValidateZipCode', () => {
    const service = new ValidationService();

    it('Should Return an Error on No Zip Code', done => {
        service.ValidateZipCode(null).catch((error: ValidationError) => {
            expect(error).to.not.be.null;
            expect(error.Type).to.equal(ErrorType.InvalidZipCode);

            done();
        })
    });

    it('Should Return Error on Empty Zip Code', done => {
        service.ValidateZipCode('').catch((error: ValidationError) => {
            expect(error).to.not.be.null;
            expect(error.Type).to.be.equal(ErrorType.InvalidZipCode);

            done();
        });
    });

    it('Should Return Error If Zip Code is Less than 5 numbers', done => {
        service.ValidateZipCode('1234').catch((error: ValidationError) => {
            expect(error).to.not.be.null;
            expect(error.Type).to.be.equal(ErrorType.InvalidZipCode);

            done();
        });
    });

    it('Should Return Error If Zip Code is Not Numbers', done => {
        service.ValidateZipCode('abcd').catch((error: ValidationError) => {
            expect(error).to.not.be.null;
            expect(error.Type).to.be.equal(ErrorType.InvalidZipCode);

            done();
        });
    });

    it('Should Validate If Zip Code is 5 Numbers', done => {
        service.ValidateZipCode('12345').then(() => {
            done();
        }).catch((error: ValidationError) => {
            expect(error).to.be.null;
            done();
        });
    });

    it('Should Validate If Zip Code is Extended Zip Code', done => {
        service.ValidateZipCode('12345-1234').then(() => {
            done();
        }).catch((error: ValidationError) => {
            expect(error).to.be.null;

            done();
        });
    });
});