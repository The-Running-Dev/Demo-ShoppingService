import { ApiPayload } from './api-payload.model';

export interface IResponsePayload {
    statusCode: number;

    body: ApiPayload;
}