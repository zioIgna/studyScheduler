import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string, returnSecureToken: boolean){
this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]`)
  }

}
