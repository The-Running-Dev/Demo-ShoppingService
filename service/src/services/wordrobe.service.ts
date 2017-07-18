import { DataPayload } from '../models/data-payload.model';
import { AutumnWardrobe, SpringWardrobe, SummerWardrobe, WinterWardrobe } from '../models/wardrobe.enums';
import { AutumnItem, SpringItem, SummerItem, WinterItem } from '../models/season-item,models';
import { WardrobeItem } from '../models/wardrobe-item.model';
import { WeatherService } from './weather.service';

// Provides wardrobe functions, such as suggestions based on the current weather
// and random seasonal wardrobe items
export class WardrobeService {
    public weatherService: WeatherService;

    constructor(weatherService: WeatherService) {
        this.weatherService = weatherService;
    }

    // Get wardrobe item suggestion based on the given zip code
    public GetSuggestion(zipCode: string): Promise<DataPayload> {
        return new Promise((resolve: any, reject: any) => {
            // First get the weather for the zip code
            this.weatherService.GetWeather(zipCode).then((payload: DataPayload) => {
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
            }).catch((error: any) => {
                return reject(error);
            });
        });
    }

    public GetSpringItem(): WardrobeItem {
        return new SpringItem(this.GetRandomSeasonItem(SpringWardrobe))
    }

    public GetSummerItem(): WardrobeItem {
        return new SummerItem(this.GetRandomSeasonItem(SummerWardrobe))
    }

    public GetAutumnItem(): WardrobeItem {
        return new AutumnItem(this.GetRandomSeasonItem(AutumnWardrobe))
    }

    public GetWinterItem(): WardrobeItem {
        return new WinterItem(this.GetRandomSeasonItem(WinterWardrobe))
    }

    // Gets a random wardrobe item from the provided season item enum
    public GetRandomSeasonItem(itemEnum: any): string {
        // Get the keys from the enum, but filter only the numbers
        let keys = Object.keys(itemEnum).map(n => parseInt(n)).filter(n => !isNaN(n));
        let min = Math.min(...keys);
        let max = Math.max(...keys);
        let index = Math.floor(Math.random() * (max - min) + min);

        return itemEnum[index];
    }
}