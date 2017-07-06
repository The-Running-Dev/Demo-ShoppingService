import { ICity } from './city.model';
import { ITimeZone } from './time-zone.model';

export interface ILocation {
    zip_code: string;

    lat: number;

    lng: number;

    city: string;

    state: string;

    acceptable_city_names: ICity[];

    timezone: ITimeZone;
}