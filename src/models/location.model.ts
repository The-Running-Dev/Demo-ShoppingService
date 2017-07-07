import { ICity } from './city.model';
import { ITimeZone } from './time-zone.model';

export interface ILocation {
    zip_code: string;

    lat: string;

    lng: string;

    city: string;

    state: string;
}