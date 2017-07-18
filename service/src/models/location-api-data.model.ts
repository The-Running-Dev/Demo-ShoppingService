import { ILocation } from './location.model';
import { ValidationError } from './validation-error.model';

export class LocationApiData {
    public Location: ILocation;

    public Error: ValidationError;
}