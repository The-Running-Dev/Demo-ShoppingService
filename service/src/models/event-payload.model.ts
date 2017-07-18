import { IQueryParameters } from './query-parameters.model';

export interface IEventPayload {
    method: string;

    queryStringParameters: IQueryParameters;
}