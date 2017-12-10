import { Component, OnInit } from '@angular/core';
import {Deck} from "../deck.model";
import {CardService} from "../../card/card.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Card} from "../../card/card.model";
import {DeckService} from "../deck.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.css']
})
export class DeckDetailComponent implements OnInit {

  deck: Deck;
  cards: Card[];
  id: string;
  decks: Deck[];
  subscription: Subscription;

  constructor(private deckService: DeckService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.deckService.getDeck(this.id.toString())
            .then(deck => this.deck = deck)
            .catch(error => console.log('error'));
        }
      );
    this.subscription = this.deckService.decksChanged
      .subscribe(
        (decks: Deck[]) => {
          this.decks = decks;
        }
      );
  }

 goToOverview(){
    console.log('go to overview from details');
   this.router.navigate(['../../','view', this.id], {relativeTo: this.route});

 }
  onEditDeck() {
    // recipe-edit.component -> onSubmit -> updaterecipe
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteDeck() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
        } );
    this.deckService.deleteDeck(this.id)
      .then(()=>{ console.log('deleted');this.router.navigate(['/deck']);})
      .catch((error) => console.log(error));

  }
}
