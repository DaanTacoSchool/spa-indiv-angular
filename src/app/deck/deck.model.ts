import { Card } from '../card/card.model';

export class Deck {

  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public made_by: string,
    public hero_type: string,
    public cards: Card[],
    public userId: number
    ) { }

}

