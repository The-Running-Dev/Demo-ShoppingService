import { ILocation } from './location.model';
import { IWeather } from './weather.model';
import { WardrobeItem } from './wardrobe-item.model';

export interface IResponsePayload {
    Message: string;

    Location: ILocation;

    Weather: IWeather;

    WardrobeItem: WardrobeItem;
}