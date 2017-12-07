import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { DropdownDirective } from './shared/dropdown.directive';
import { AppComponent } from './app.component';
import { DeckComponent } from './deck/deck.component';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card/card-list/card-list.component';
import { CardItemComponent } from './card/card-list/card-item/card-item.component';
import { HeaderComponent } from './header/header.component';
import {CardService} from './card/card.service';
import {DeckService} from './deck/deck.service';
import { AppRoutingModule } from './app-routing.module';
import { CardDetailComponent } from './card/card-detail/card-detail.component';
import { CardStartComponent } from './card/card-start/card-start.component';


@NgModule({
  declarations: [
    AppComponent,
    DeckComponent,
    CardComponent,
    CardListComponent,
    CardItemComponent,
    HeaderComponent,
    CardDetailComponent,
    DropdownDirective,
    CardStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [CardService, DeckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
