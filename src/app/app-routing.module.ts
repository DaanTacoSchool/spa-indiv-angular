import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardComponent } from './card/card.component';
import { CardListComponent } from './card/card-list/card-list.component';
import { DeckComponent } from './deck/deck.component';
//import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
//import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
//import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  /*
  { path: '', redirectTo: '/deck', pathMatch: 'full' },
  { path: 'deck', component: DeckComponent, children: [
    { path: '', component: DeckComponent }, TODO:decklist
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent },
  ] },
  { path: 'cards', redirectTo: '/cards', pathMatch: 'full' },
  { path: 'cards', component: CardListComponent , children: [
    { path: '', component: CardListComponent } ]  } recipestart
  */
  { path: '', redirectTo: '/cards', pathMatch: 'full' },
  { path: 'cards', component: CardComponent, children: [
    { path: '', component: CardListComponent }]},
  { path: 'deck', component: DeckComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
