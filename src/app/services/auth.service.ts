import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<string | null>(null); // BehaviorSubject to track username
  currentUser$ = this.currentUserSubject.asObservable(); // Observable for components to subscribe

  login(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if ((username === 'balbir' && password === '123') || users[username] === password) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', username);
      this.currentUserSubject.next(username); // Emit the new username
      return true;
    }
    return false;
  }

  register(username: string, password: string): void {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUser(): string | null {
    return localStorage.getItem('username');
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    this.currentUserSubject.next(null); // Emit null when user logs out
  }
}
