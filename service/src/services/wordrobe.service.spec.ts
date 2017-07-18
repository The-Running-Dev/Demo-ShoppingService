import { DataPayload } from "src/models/data-payload.model";
import { Season } from '../models/season.enum';
import { WeatherService } from './weather.service';
import { WardrobeService } from './wordrobe.service';

describe('WardrobeService', () => {
    const mockWeatherService = <WeatherService> {
        GetWeather(zipCode: string): Promise<DataPayload> {
            return Promise.resolve(<DataPayload>{});
        }
    };
    let service = new WardrobeService(mockWeatherService);

    it('Should Return a Spring Item', done => {
        let item = service.GetSpringItem()

        item.should.not.be.null;
        item.Season.should.equal(Season.Spring);
        item.Name.should.not.be.empty;

        done();
    });

    it('Should Return a Summer Item', done => {
        let item = service.GetSummerItem();

        item.should.not.be.null;
        item.Season.should.equal(Season.Summer);
        item.Name.should.not.be.empty;

        done();
    });

    it('Should Return a Autumn Item', done => {
        let item = service.GetAutumnItem();

        item.should.not.be.null;
        item.Season.should.be.equal(Season.Autumn);
        item.Name.should.not.be.empty;

        done();
    });

    it('Should Return a Winter Item', done => {
        let item = service.GetWinterItem();

        item.should.not.be.null;
        item.Season.should.be.equal(Season.Winter);
        item.Name.should.not.be.empty;

        done();
    });
});
