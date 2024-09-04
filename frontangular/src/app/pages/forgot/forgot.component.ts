import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForgotService } from '../../services/forgot.service';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent implements OnInit {
  fb = inject(FormBuilder);
  forgotService = inject(ForgotService);

  form!: FormGroup;
  cls = '';
  message = '';

  ngOnInit(): void {
      this.form = this.fb.group({
        email: ''
      });
  }

  onSubmit() {
    this.forgotService.forgot(this.form.getRawValue())
          .subscribe( (data ) => {
            this.cls = 'success';
            this.message = 'email was sent!'
          }, (err) => {
            this.cls = 'danger';
            this.message = 'Error occurs!'
          } )
  }
}
