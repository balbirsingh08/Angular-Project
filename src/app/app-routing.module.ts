import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SupportComponent } from './support/support.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect root to Login
  { path: 'login', component: LoginComponent }, // Login route
  { path: 'home', component: HomeComponent },   // Home route
  { path: 'support', component: SupportComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'filter-dropdown', component: FilterDropdownComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
