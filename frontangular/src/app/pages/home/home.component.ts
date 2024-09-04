import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  message: string = '';

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user().subscribe( (res: any) => {
        this.message = `Hi ${res.first_name} ${res.last_name}`
        this.authService.authEmitter.emit(true);
    }, (error) => {
      this.message = 'you are not authenticated'
      this.authService.authEmitter.emit(false);
      }
    );
  }
}
