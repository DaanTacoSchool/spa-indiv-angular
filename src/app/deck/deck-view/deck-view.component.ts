import {Component, Input, OnInit} from '@angular/core';
import {Deck} from "../deck.model";
import {DeckService} from "../deck.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {CardService} from "../../card/card.service";
import {Card} from "../../card/card.model";

@Component({
  selector: 'app-deck-view',
  templateUrl: './deck-view.component.html',
  styleUrls: ['./deck-view.component.css']
})
export class DeckViewComponent implements OnInit {
 deck: Deck;
 id: string;
 cards: Card[];
 cardsInDeck: Card[];
  private deckSubscription: Subscription;
  private cardsSubscription: Subscription;
  private cardsInDeckSubscription: Subscription;
  constructor(private deckService: DeckService,
              private cardService: CardService,
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
    this.deckSubscription = this.deckService.deckChanged
      .subscribe(
        (deck: Deck) => {
          this.deck = deck;
        }
      );
    this.cardsInDeckSubscription = this.cardService.cardsInDeckChanged
      .subscribe(
        (cardsInDeck: Card[]) => {
          this.cardsInDeck = cardsInDeck;
        }
      );
    this.cardsSubscription = this.cardService.cardsChanged
      .subscribe(
        (cards: Card[]) => {
          this.cards = cards;
        }
      );

    this.cardService.getCardsInDeck(this.id)
      .then(cardsInDeck => this.cardsInDeck = cardsInDeck)
      .catch(error => console.log(error));
    this.cardService.getAllCards()
      .then(cards => this.cards = cards)
      .catch(error => console.log(error));
  }

  addCardToDeck(cardId: string){
    let cardIndex = this.cards.findIndex(x=>x._id === cardId);

    //  this.deckService.createDeck(newDeck).then((deck) => { this.deck = deck; this.addCardToDeck(cardId);}).catch(error => console.log(error));

   this.deckService.addCardToDeck(this.deck, this.cards[cardIndex])
     .then(deck => {this.deck = deck;
       this.cardService.getCardsInDeck(this.deck._id)
         .then(cardsInDeck => this.cardsInDeck = cardsInDeck)
         .catch(error => console.log(error));
     })
     .catch(error => console.log(error));
/*.then(() => {
       this.cardService.getAllCards()
         .then(cards => this.cardsInDeck = cards)
         .catch(error => console.log(error));
     })*/


  }

}
