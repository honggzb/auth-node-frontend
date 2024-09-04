import { Component, inject, OnInit  } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  authenticated = false;

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.authEmitter.subscribe( (authenticated) =>
        this.authenticated = authenticated )
  }


  onLogout() {
    this.authService.logout().subscribe(() => this.authService.accessToken = '' )
    this.authService.authEmitter.emit(false);
  }
}
