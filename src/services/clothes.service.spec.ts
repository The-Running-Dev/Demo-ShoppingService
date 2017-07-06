import * as chai from 'chai';
const expect = chai.expect;

import { ClothesService } from './clothes.service';
import { Season } from '../models/season.enum';

describe('ClothesService', () => {
    let service = new ClothesService();

    it('Should Return a Spring Item', done => {
        let item = service.GetSpringItem()

        expect(item).to.not.be.null;
        expect(item.Season).to.be.equal(Season.Spring);

        done();
    });

    it('Should Return a Summer Item', done => {
        let item = service.GetSummerItem();

        expect(item).to.not.be.null;
        expect(item.Season).to.be.equal(Season.Summer);

        done();
    });

    it('Should Return a Autumn Item', done => {
        let item = service.GetAutumnItem();

        expect(item).to.not.be.null;
        expect(item.Season).to.be.equal(Season.Autumn);

        done();
    });

    it('Should Return a Winter Item', done => {
        let item = service.GetWinterItem();

        expect(item).to.not.be.null;
        expect(item.Season).to.be.equal(Season.Winter);

        done();
    });
});