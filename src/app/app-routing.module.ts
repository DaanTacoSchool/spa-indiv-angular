import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardComponent } from './card/card.component';
import { CardListComponent } from './card/card-list/card-list.component';
import { CardDetailComponent } from './card/card-detail/card-detail.component';
import { CardStartComponent} from './card/card-start/card-start.component';
import { DeckComponent } from './deck/deck.component';
import { DeckStartComponent } from './deck/deck-start/deck-start.component';
import { DeckItemComponent} from './deck/deck-list/deck-item/deck-item.component';
import { DeckListComponent} from './deck/deck-list/deck-list.component';
import {Deck} from './deck/deck.model';
import {DeckDetailComponent} from './deck/deck-detail/deck-detail.component';
import {DeckEditComponent} from './deck/deck-edit/deck-edit.component';
import {DeckViewComponent} from './deck/deck-view/deck-view.component';

const appRoutes: Routes = [

  { path: '', redirectTo: '/cards', pathMatch: 'full' },
  { path: 'cards', component: CardComponent, children: [
    { path: '', component: CardStartComponent },
    { path: ':id', component: CardDetailComponent },

  ]},
  { path: 'deck', component: DeckComponent, children: [
    { path: '', component: DeckStartComponent },
    { path: 'new', component: DeckEditComponent },
    { path: 'new/:cardid', component: DeckEditComponent },
    { path: ':id', component: DeckDetailComponent },
    { path: ':id/edit', component: DeckEditComponent },
  ] },
  { path: 'view/:id', component: DeckViewComponent},

];
// TODO add path for new deck
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
