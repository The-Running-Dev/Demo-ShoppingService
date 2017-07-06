import * as chai from 'chai';
const expect = chai.expect;

import { GetSuggestion } from './shopping-service';
import { IEventPayload } from './models/payload.model';
import { ValidationError } from './models/validation-error.model';

describe('GetSuggestion', () => {
    /*
    it('Should Return Error on No Zip Code', done => {
        GetSuggestion(null, null, (error: ValidationError) => {
            expect(error).to.not.be.undefined;
            expect(error.Type).to.be.instanceof(ValidationError);

            done();
        });
    });

  it('Should Return Error on an Empty Zip Code', done => {
    let payload: IEventPayload = {
      ZipCode: ''
    };

    GetSuggestion(payload, null, (error: ValidationError) => {
      expect(error).to.not.be.undefined;
      expect(error.Type).to.be.instanceof(ValidationError);

      done();
    });
  });
  */
});