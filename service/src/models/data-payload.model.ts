import { ILocation } from './location.model';
import { IWeather } from './weather.model';
import { WardrobeItem } from './wardrobe-item.model';

export class DataPayload {
    Message: string;

    Location: ILocation;

    Weather: IWeather;

    WardrobeItem: WardrobeItem;

    constructor(message?: string, location?: ILocation, weather?: IWeather, item?: WardrobeItem) {
        this.Message = (message != null) ? message : '';
        this.Location = (location != null) ? location : null;
        this.Weather = (weather != null) ? weather : null;
        this.WardrobeItem = (item != null) ? item : null;
    }
}