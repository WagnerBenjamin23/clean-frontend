import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-auth.component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  providers: [AuthService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  logginForm: FormGroup;
  showErrorMessage = false;
  isLoading = false;
  hidePassword = true;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.logginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.logginForm.statusChanges.subscribe(() => {
      this.showErrorMessage = false;
    });
  
  }



onLogin() {

  if (this.logginForm.invalid) {
    this.logginForm.markAllAsTouched();
    return;
  }

  this.showErrorMessage = false;

  this.authService
    .login(this.logginForm.value.email, this.logginForm.value.password)
    .subscribe({
      next: (res) => {
        localStorage.setItem('token', res.idToken);
        localStorage.setItem(
          'user',
          JSON.stringify({
            uid: res.uid,
            email: res.email,
            idRole: res.roles_idRole
          })
        );
        this.router.navigate(['/admin']);
      },
      error: (e) => {
        console.log(e)
        this.showErrorMessage = true; 
        this.cdr.detectChanges();
      }
    });
}


  onUserInput(): void {
    this.showErrorMessage = false;
  }
}
