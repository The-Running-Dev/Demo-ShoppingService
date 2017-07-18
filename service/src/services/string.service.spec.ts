import { StringService } from './string.service';

describe('StringService', () => {
    const service = new StringService();

    it('Should Return Original String', done => {
        let expected = 'String1';
        let actual = service.Format(expected);

        actual.should.be.equal(expected);
        done();
    });

    it('Should Return Proper Format with 1 Values', done => {
        let expected = 'String1';
        let actual = service.Format('{0}', 'String1');

        actual.should.be.equal(expected);
        done();
    });

    it('Should Return Proper Format with 2 Values', done => {
        let expected = 'String1-String2';
        let actual = service.Format('{0}-{1}', 'String1', 'String2');

        actual.should.be.equal(expected);
        done();
    });

    it('Should Return Proper Format with Complex String', done => {
        let expected = 'Writing-Tests-Is-So-Much-Fun';
        let actual = service.Format('Writing-{0}-Is-{1}-Much-{2}', 'Tests', 'So', 'Fun');

        actual.should.be.equal(expected);
        done();
    });
});
