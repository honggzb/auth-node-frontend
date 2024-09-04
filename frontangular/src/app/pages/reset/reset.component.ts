import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForgotService } from '../../services/forgot.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent implements OnInit{

  fb = inject(FormBuilder);
  forgotService = inject(ForgotService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  form!: FormGroup;

  ngOnInit(): void {
      this.form = this.fb.group({
        password: '',
        password_confirm: ''
      });
  }

  onSubmit() {
    const formData = this.form.getRawValue();
    const data = {
      ...formData,
      token: this.route.snapshot.params['token']
    }
    this.forgotService.reset(data).subscribe( (data ) => {
        this.router.navigate(['/login'])
     } )
  }
}
