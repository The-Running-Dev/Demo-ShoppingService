import { Component, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/Rx';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public zipCode: string;
    public Message: string;
    public ErrorMessage: string;

    private _apiUrl: string = 'https://9arrta3i4i.execute-api.us-east-1.amazonaws.com/dev/suggest';

    constructor(private http: Http) {
        this.zipCode = '78748';
    }

    public GetSuggestion() {
        this.Message = '';

        this.http.get(`${this._apiUrl}?ZipCode=${this.zipCode}`)
            .map(response => response.json())
            .catch((error: any) => this.HandleHttpError(error))
            .subscribe((response: any) => {
                this.Message = <any>response.Message;
            });
    }

    public HandleHttpError(response: any): Observable<any> {
        let handledResponse = {
            Code: 0,
            Message: ''
        };

        try {
            if (response.status == 400) {
                let error = <any>response.text();

                handledResponse = {
                    Code: 400,
                    Message: (error !== '{}') ? error : 'Ooops! I don\'t know...'
                };
            }
            else if (response.status == 404) {
                handledResponse = {
                    Code: 404,
                    Message: 'Data Not Found'
                };
            }
            else if (response.status == 500) {
                let responseJson = <any>response.json();

                handledResponse = {
                    Code: 500,
                    Message: responseJson.Message
                };
            }
            else {
                let responseJson = <any>response.json();

                handledResponse = {
                    Code: -1,
                    Message: (responseJson.Message) ? responseJson.Message : response.json()
                };
            }
        } catch (jsonError) {
            handledResponse = {
                Code: -1,
                Message: 'Something Went Wrong.'
            };
        }

        this.ErrorMessage = handledResponse.Message;

        setTimeout(() => {
            this.ErrorMessage = '';
        }, 2000);

        return Observable.throw(handledResponse);
    }
}
