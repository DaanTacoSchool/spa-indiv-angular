import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "./user.model";
import {Http} from "@angular/http";
import {Subject} from "rxjs/Subject";
import {int} from "neo4j-driver/types/v1";

@Injectable()
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/users'; // URL to web api
  users: User[];
  usersSearchedChanged = new Subject<User[]>();
  constructor(private http: Http) { }


  public getAllUsers(): Promise<User[]> {
    return this.http.get(this.serverUrl)
      .toPromise()
      .then(response => {
        this.users = response.json() as User[];// <--- moet eerst nog parsen van cypher naar een object
        this.usersSearchedChanged.next(this.users.slice());
        return response.json() as User[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public findUsers(search: string): Promise<User[]> {
    return this.http.post(this.serverUrl + '/search/'+ search,{ headers: this.headers })
      .toPromise()
      .then(response => {
       const tmpUserArr = response.json() // as User[]
       const  tmpFilledArray: User[] = [];
       // console.log('findusers');
       for(let i=0; i<tmpUserArr.length; i++){
         const tmpUser = new User(
            tmpUserArr[i][0],
            tmpUserArr[i][1],
            tmpUserArr[i][2]
         );
         tmpFilledArray.push(tmpUser);
       }
        this.users = tmpFilledArray;
        // console.log('users in userservice::  '+this.users);
        this.usersSearchedChanged.next(this.users.slice());
        return tmpFilledArray as User[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    // console.log('HANDLE ERROR: ' +error);
    return Promise.reject(error.message || error);
  }
}
