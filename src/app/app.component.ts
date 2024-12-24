import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Main Site';

  constructor(private router: Router) {
    // Add predefined users to localStorage if not already present
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    if (!users['balbir']) {
      users['balbir'] = '123'; // Predefined username and password
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    }
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedIn');
  }

  // Get the username of the logged-in user
  getUsername(): string {
    const username = localStorage.getItem('loggedIn');
    return username ? username.split('@')[0] : ''; // Get the part before '@'
  }

  // Handle user logout
  logout(): void {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
}