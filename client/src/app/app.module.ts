import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FocusElement } from './shared/directives/focus-element.directive';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    declarations: [AppComponent, FocusElement],
    bootstrap: [AppComponent]
})
export class AppModule {
}
