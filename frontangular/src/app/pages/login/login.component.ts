import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  form!: FormGroup;

  ngOnInit(): void {
      this.form = this.fb.group({
        email: '',
        password: ''
      });
  }

  onSubmit() {
    this.authService.login(this.form.getRawValue())
          .subscribe( (res: any ) => {
            this.authService.accessToken = res.token;
            this.authService.authEmitter.emit(true);
            this.router.navigate(['/'])
          });
  }
}
