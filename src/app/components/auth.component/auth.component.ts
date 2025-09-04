import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatSlideToggleModule, MatIconModule ],
  providers: [AuthService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',

})
export class AuthComponent  {

  showErrorMessage=false;
  logginForm : FormGroup = new FormGroup({});

  constructor(private formBuilder : FormBuilder, private authService: AuthService, private router: Router) {
    this.logginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

  onLogin() {
    this.showErrorMessage=true;
    if (this.logginForm.valid) {
      const email = this.logginForm.get('email')?.value;
      const password = this.logginForm.get('password')?.value;

  }
    this.authService.login(this.logginForm.value.email, this.logginForm.value.password)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.idToken);
          localStorage.setItem('user', JSON.stringify({uid: res.uid, email: res.email, idRole: res.roles_idRole}));
          this.router.navigate(['/admin']);
          this.showErrorMessage = false;
        },
        error: (e) => {
          this.showErrorMessage = true;
        }
      });
    }

}
