export class OpenWeatherApi {
    public EndPoint: string;

    public ZipCode: string;

    constructor(zipCode: string) {
        this.ZipCode = zipCode;
        this.EndPoint = String.Format(this._endPointTemplate, this._apiKey, this.ZipCode);
    }

    private _apiKey = '16e4d56d32c8b2a524bfd64d1fa5ce32';

    private _endPointTemplate: string = '${0}/rest/${1}/info.json/${2}/degree';
}