export class ZipCodeApi {
    public ZipCode: string;

    public EndPoint: string;

    constructor(zipCode: string) {
        this.ZipCode = zipCode;
        this.EndPoint = String.Format(this._endPointTemplate, this._apiKey, this.ZipCode);
    }

    private _apiKey: string = 'f1YvFlaLgkB2GP1hHmXSHELbanl0dzasA9Yfu91KuCNbrOs9bq2S4N3fapfoYqQz';

    private _endPointTemplate: string = 'www.ZipCodeAPI.com/rest/${0}/info.json/${1}/degree';
}