import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string | null = null; // Property to hold login error messages

  constructor(private router: Router) {}

  // Login method that accepts username and password
  login(username: string, password: string): void {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    if (users[username] === password) {
      localStorage.setItem('loggedIn', username); // Store the username
      this.router.navigate(['/home']);
      this.loginError = null; // Clear any previous error messages
    } else {
      // Handle login failure (e.g., show an error message)
      this.loginError = 'Invalid username or password';
    }
  }
}