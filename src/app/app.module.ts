import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DeckListComponent } from './deck/deck-list/deck-list.component';
import { DeckDetailComponent } from './deck/deck-detail/deck-detail.component';
import { DeckEditComponent } from './deck/deck-edit/deck-edit.component';
import { DeckItemComponent } from './deck/deck-list/deck-item/deck-item.component';
import { DeckViewComponent } from './deck/deck-view/deck-view.component';
import { DeckStartComponent } from './deck/deck-start/deck-start.component';
import { DeckViewCardItemComponent } from './deck/deck-view/deck-view-card-item/deck-view-card-item.component';
import { DeckViewCardInDeckListComponent } from './deck/deck-view/deck-view-card-in-deck-list/deck-view-card-in-deck-list.component';
import { DeckViewCardInDeckListItemComponent } from './deck/deck-view/deck-view-card-in-deck-list-item/deck-view-card-in-deck-list-item.component';
import {UserService} from "./shared/user.service";


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
    CardStartComponent,
    DeckListComponent,
    DeckDetailComponent,
    DeckEditComponent,
    DeckItemComponent,
    DeckViewComponent,
    DeckStartComponent,
    DeckViewCardItemComponent,
    DeckViewCardInDeckListComponent,
    DeckViewCardInDeckListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [CardService, DeckService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
