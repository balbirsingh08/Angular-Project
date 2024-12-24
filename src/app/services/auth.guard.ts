import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Assuming AuthService exists for managing authentication
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.authService.isLoggedIn(); // Use AuthService for authentication check

    if (isAuthenticated) {
      return true;
    } else {
      // Redirect to the Sign-In page and pass the return URL for navigation after login
      this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
