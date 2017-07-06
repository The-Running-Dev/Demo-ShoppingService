import { IResponsePayload } from './response-payload.model';

export interface ICallback {
    (error: any, result: IResponsePayload): void;
}