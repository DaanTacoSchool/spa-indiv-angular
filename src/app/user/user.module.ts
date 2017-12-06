//import { Ingredient } from '../shared/ingredient.model';

export class User {

  constructor(
    public _id: string,
    public username: string,
    public email: string,
    public password: string,
    public decks: Deck[]) { }
}

