import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "./user.model";
import {Http} from "@angular/http";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/users'; // URL to web api
  users: User[];
  usersSearchedChanged = new Subject<User[]>();
  constructor(private http: Http) { }

  /* make user service? */
  public findUsers(search: string): Promise<User[]> {
    return this.http.post(this.serverUrl + '/search/'+ search,{ headers: this.headers })
      .toPromise()
      .then(response => {
        this.users = response.json() as User[];
        this.usersSearchedChanged.next(this.users.slice());
        return response.json() as User[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log('HANDLE ERROR: ' +error);
    return Promise.reject(error.message || error);
  }
}
