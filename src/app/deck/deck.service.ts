import { Injectable } from '@angular/core';
import {Deck} from './deck.model';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import {Card} from '../card/card.model';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class DeckService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/decks'; // URL to web api
  private decks: Deck[] = [];
  public decksChanged = new Subject<Deck[]>();
  public deckChanged = new Subject<Deck>(); // single deck for editing and creating
  constructor(private http: Http) { }


  public getDecks(): Promise<Deck[]> {
    console.log('deck ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        this.decks = response.json() as Deck[];
        return this.decks;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getDeck(deckid: string): Promise<Deck> {
    return this.http.get(this.serverUrl + '/' + deckid, { headers: this.headers })
      .toPromise()
      .then(response => {
        // TODO: maybe subscription .next?
        return response.json() as Deck;

      })
      .catch(error => {
        return this.handleError(error);
      });
  }



  createDeck(deck: Deck) {

    const d = deck;

    return this.http.post(this.serverUrl , d)
      .toPromise()
      .then(response => {
        let tmpDeck = response.json() as Deck;
        this.decks.push(tmpDeck);
        this.decksChanged.next(this.decks.slice());
        return tmpDeck;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  /* NOTE:  kan put en post zijn */

  addCardToDeck(deck: Deck, card: Card) {

    const d = deck;
    const c = card;
    d.cards.push(c);
    // calls the updatedeck method in api
    return this.http.put(this.serverUrl + '/' + d._id , d)
      .toPromise()
      .then(response => {
        const tDeck= response.json() as Deck;
        this.deckChanged.next(tDeck);
        return tDeck;

      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  // ONLY USE FROM DECK-VIEW.COMPONENT OR SPLICE IN CALLING METHOD.
  // removeCardFromDeck(deck: Deck, card: Card) {
  removeCardFromDeck(deck: Deck) {
    const d = deck;

    return this.http.put(this.serverUrl + '/' + d._id , d)
      .toPromise()
      .then(response => {
        const tDeck= response.json() as Deck;
        this.deckChanged.next(tDeck);
        return tDeck;

      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  updateDeck(index: string, newDeck: Deck) {

    return this.http.put(this.serverUrl + '/' + index , newDeck)
      .toPromise()
      .then(response => {
       // this.decks.push(newDeck);
        let arrayIndex = this.decks.findIndex(x=>x._id === index);
        this.decks[arrayIndex] = response.json() as Deck;
         this.decksChanged.next(this.decks.slice());
        return response.json() as Deck;
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteDeck(deckid: string) {
    return this.http.delete(this.serverUrl + '/' + deckid, { headers: this.headers })
      .toPromise()
      .then(response => {
        this.decksChanged.next(this.decks.slice());
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log('HANDLE ERROR: '+error);
    return Promise.reject(error.message || error);
  }
}
