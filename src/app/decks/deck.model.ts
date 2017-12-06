import { Card } from '../shared/card.model';

export class Deck {

  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public made_by: string,
    public cards: Card[]) { }
}

