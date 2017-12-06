import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/recipes'; // URL to web api
 // private recipes: Recipe[] = [];
 // recipesChanged = new Subject<Recipe[]>();

  constructor() { }

}
