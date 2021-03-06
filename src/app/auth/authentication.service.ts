import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _user = new BehaviorSubject<User>(null);

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return !!user.token;
      }
      else { return false; }
    }));
  }

  get userId() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.id;
      } else {
        return null;
      }
    }));
  }

  get userIdToken() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.token;
      } else {
        return null;
      }
    }));
  }

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey_authenticated}`,
      { email: email, password: password, returnSecureToken: true }
    ).pipe(tap(
      this.setUserData.bind(this)
      // res => {
      //   this.setUserData.bind(this);
      //   this.setStandardSettings.bind(this);
      // }
    ));
  }

  signUp2(email: string, password: string) {
    let respData: AuthResponseData;
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey_authenticated}`,
      { email: email, password: password, returnSecureToken: true }
    ).pipe(
      tap(this.setUserData.bind(this)),
      tap(res => respData = res),
      switchMap((res) => {
        return this.setStandardSettings(res.localId, res.idToken);
        // const deadlines = [2, 5, 7, 13, 20];
        // return this.http.put<number[]>(
        //   `https://study-planner-w-authentication.firebaseio.com/users/${res.localId}/settings/deadlines.json?auth=${res.idToken}`,
        //   deadlines
        // );
      }),
      tap((res) =>
        console.log('Eseguito il signup ', res)
      ),
      switchMap(res => {
        return of(respData);
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey_authenticated}`,
      { email: email, password: password, returnSecureToken: true }
    ).pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    this._user.next(null);
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
    this._user.next(new User(userData.localId, userData.email, userData.idToken, expirationTime));
  }

  setStandardSettings(localId: string, idToken: string) {
    const deadlines = [2, 5, 7, 13, 20];
    return this.http.put<number[]>(
      `https://study-planner-w-authentication.firebaseio.com/users/${localId}/settings/deadlines.json?auth=${idToken}`,
      deadlines
    );
  }

  setCustomSettings(settings: number[]) {
    let fetchedUserId;
    let fetchedUserToken;
    return this.userId.pipe(
      take(1),
      tap(res => fetchedUserId = res),
      switchMap(res => { return this.userIdToken; }),
      take(1),
      tap(res => fetchedUserToken = res),
      switchMap(res => {
        return this.http.put<number[]>(
          `https://study-planner-w-authentication.firebaseio.com/users/${fetchedUserId}/settings/deadlines.json?auth=${fetchedUserToken}`,
          settings
        )
      })
    )
  }

  fetchUserDeadlines() {
    // let currUser;
    return this._user.asObservable().pipe(
      take(1),
      switchMap(res => {
        // currUser = res;
        return this.http.get<number[]>(`https://study-planner-w-authentication.firebaseio.com/users/${res.id}/settings/deadlines.json?auth=${res.token}`)
      })
    )

    // let id;
    // let token;
    // return this.userId.pipe(
    //   switchMap(res => {
    //     id = res;
    //     return this.userIdToken
    //   }),
    //   switchMap(res => {
    //     token = res;
    //     return this.http.get<number[]>(`https://study-planner-w-authentication.firebaseio.com/users/${id}/settings/deadlines.json?auth=${token}`)
    //   })
    // )
  }

}
