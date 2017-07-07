import * as chai from 'chai';

import { WardrobeService } from './wordrobe.service';
import { Season } from '../models/season.enum';
import { WeatherService } from './weather.service';
import { IResponsePayload } from '../models/response-payload.model';

const expect = chai.expect;

describe('WardrobeService', () => {
    const mockWeatherService = <WeatherService> {
        GetWeather(zipCode: string): Promise<IResponsePayload> {
            return Promise.resolve(<IResponsePayload>{});
        }
    };
    let service = new WardrobeService(mockWeatherService);

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