import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
        ]
      ],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { mismatch: true };
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    // Retrieve users dictionary from localStorage
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    const { email, password } = this.registrationForm.value;

    if (users[email]) {
      alert('User already registered.');
      return;
    }

    // Add new user to localStorage
    users[email] = password;
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    // Save the registered user's username in localStorage as well
    localStorage.setItem('username', email); // Save email as username

    alert('Registration Successful! You can now log in.');
    this.router.navigate(['/login']);
  }
}
