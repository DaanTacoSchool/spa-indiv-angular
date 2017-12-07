import {Component, OnDestroy, OnInit} from '@angular/core';
import {Deck} from '../deck.model';
import {Subscription} from 'rxjs/Subscription';
import {DeckService} from '../deck.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit,OnDestroy {
  decks: Deck[];
  subscription: Subscription;

  constructor(private deckService: DeckService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.deckService.decksChanged
      .subscribe(
        (decks: Deck[]) => {
          this.decks = decks;
        }
      );
    this.deckService.getDecks()
      .then(decks => this.decks = decks)
      .catch(error => console.log(error));
  }

  onNewDeck() {
    // TODO:either new component or implement formgroup here
    // this.deckService.createDeck()
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
