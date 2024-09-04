
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  form!: FormGroup;

  ngOnInit(): void {
      this.form = this.fb.group({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: ''
      });
  }

  onSubmit() {
    this.authService.register(this.form.getRawValue())
        .subscribe( (data) => this.router.navigate(['/login'])  )
  }

}
