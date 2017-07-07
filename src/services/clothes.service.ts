import { AutumnItem, SpringItem, SummerItem, WinterItem } from '../models/season-Items';
import { IResponsePayload } from '../models/response-payload.model';
import { WardrobeItem } from '../models/wardrobe-item.model';
import { WeatherService } from './weather.service';

export class ClothesService {
    public weatherService: WeatherService;

    constructor(weatherService: WeatherService) {
        this.weatherService = weatherService;
    }

    public GetSuggestion(zipCode: string): Promise<IResponsePayload> {
        return new Promise((resolve: any) => {
            this.weatherService.GetWeather(zipCode).then((payload: IResponsePayload) => {
                let temperature = parseInt(payload.Weather.temp);

                if (temperature < 30) {
                    payload.WardrobeItem = this.GetWinterItem();
                    return resolve(payload);
                }
                else if (temperature < 60) {
                    payload.WardrobeItem = this.GetAutumnItem();
                    return resolve(payload);
                }
                else if (temperature < 80) {
                    payload.WardrobeItem = this.GetSpringItem();
                    return resolve(payload);
                }
                else {
                    payload.WardrobeItem = this.GetSummerItem();
                    return resolve(payload);
                }
            });
        });
    }

    public GetSpringItem(): WardrobeItem {
        return new SpringItem(this.GetRandomSeasonItem(SpringItem))
    }

    public GetSummerItem(): WardrobeItem {
        return new SummerItem(this.GetRandomSeasonItem(SummerItem))
    }

    public GetAutumnItem(): WardrobeItem {
        return new AutumnItem(this.GetRandomSeasonItem(AutumnItem))
    }

    public GetWinterItem(): WardrobeItem {
        return new WinterItem(this.GetRandomSeasonItem(WinterItem))
    }

    public GetRandomSeasonItem(seasonItemEnum: any): string {
        let enumLength = (Object.keys(seasonItemEnum).length / 2) - 1;
        var item = Math.floor(Math.random() * enumLength) + 0;

        return seasonItemEnum[item];
    }
}