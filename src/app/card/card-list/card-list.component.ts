import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Card } from '../card.model';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit, OnDestroy {
  cards: Card[];
  subscription: Subscription;

  constructor(private cardService: CardService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.cardService.cardsChanged
      .subscribe(
        (cards: Card[]) => {
          this.cards = cards;
        }
      );
    this.cardService.getAllCards()
      .then(cards => this.cards = cards)
      .catch(error => console.log(error));
  }

  onNewCard() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  refresh(newCards: Card[]){
    this.cards = newCards;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
