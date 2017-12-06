import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DecksComponent } from './decks/decks.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    AppComponent,
    DecksComponent,
    CardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
