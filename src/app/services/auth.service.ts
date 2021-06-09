import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo!: {
    username: string,
    password: string,
    companyId: number
  };
  loggedIn: boolean;
  loggedInSubject = new Subject<boolean>();
  companyId = 10;
  constructor() {
    const auth = localStorage.getItem('auth');
    if (auth == null) {
      this.loggedIn = false;
      this.loggedInSubject.next(false);
    } else {
      this.loggedInSubject.next(true);
      this.loggedIn = true;
      this.userInfo = JSON.parse(auth);
    }
  }
  login(username: string, password: string): boolean {
    if (username === 'test' && password === 'test@123') {
      localStorage.setItem('auth', JSON.stringify({
          username,
          password,
          companyId: this.companyId
      }));
      this.loggedInSubject.next(true);
      return true;
    } else {
      return false;
    }
  }
  check(){
    const auth = localStorage.getItem('auth');
    if (auth == null) {
      this.loggedIn = false;
      this.loggedInSubject.next(false);
      return false;
    } else {
      this.loggedInSubject.next(true);
      this.loggedIn = true;
      this.userInfo = JSON.parse(auth);
      return true;
    }
  }
  logout() {
    const auth = localStorage.getItem('auth');
    if (auth != null) {
      this.loggedIn = false;
      localStorage.removeItem('auth');
      this.loggedInSubject.next(false);
    }
  }
}
