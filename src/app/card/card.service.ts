import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import {Card} from './card.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CardService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/cards'; // URL to web api
  private cards: Card[] = [];
  public cardsChanged = new Subject<Card[]>();

  constructor(private http: Http) { }

  public getCard(cardid: string): Promise<Card> {
    return this.http.get(this.serverUrl + '/' + cardid, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Card;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  /* mogelijk dat dit naar de deckservice gaat! LET OP DE URL */
  public getCardsInDeck(deckid: string): Promise<Card[]> {
    console.log('cards in deck ophalen van server');
    return this.http.get(this.serverUrl + '/deck/' + deckid, { headers: this.headers })
      .toPromise()
      .then(response => {
        this.cards = response.json() as Card[];
        return this.cards;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getAllCards(): Promise<Card[]> {
    console.log('alle kaarten ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        this.cards = response.json() as Card[];
        return this.cards;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}
