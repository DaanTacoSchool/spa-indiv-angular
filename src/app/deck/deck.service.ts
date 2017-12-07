import { Injectable } from '@angular/core';
import {Deck} from './deck.model';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import {Card} from '../card/card.model';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";

@Injectable()
export class DeckService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/decks'; // URL to web api
  private decks: Deck[] = [];
  public decksChanged = new Subject<Deck[]>();
  public deckChanged = new Observable<Deck[]>();
  constructor(private http: Http) { }

public observTest(): Observable<Deck[]> {
    return of(this.decks);
}
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
        return response.json() as Deck;

      })
      .catch(error => {
        return this.handleError('getrecipe id service');
      });
  }



  createDeck(deck: Deck) {

    const d = deck;

    return this.http.post(this.serverUrl , d)
      .toPromise()
      .then(response => {
        return response.json() as Deck;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  /* NOTE:  kan put en post zijn */
  addCardToDeck(deck: Deck, card: Card) {

    const d = deck;
    const c = card;
    //add card to deck->cadarray...

    // add deck(id) to post and pass card in body
    return this.http.put(this.serverUrl + '/' + d._id , c)
      .toPromise()
      .then(response => {
        return response.json() as Deck;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }


  updateDeck(index: string, newDeck: Deck) {

    return this.http.put(this.serverUrl + '/' + index , newDeck)
      .toPromise()
      .then(response => {
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
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}
