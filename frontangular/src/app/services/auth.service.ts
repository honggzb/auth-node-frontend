import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken = '';

  authEmitter = new EventEmitter<boolean>();

  http = inject(HttpClient);

  register(body: any) {
    return this.http.post(`${environment.api}/register`, body);
  }

  login(body: any) {
    return this.http.post(`${environment.api}/login`, body, { withCredentials: true });
  }

  user() {
    return this.http.get(`${environment.api}/user`);
  }

  refresh() {
    return this.http.post(`${environment.api}/refresh`, {}, {withCredentials: true});
  }

  logout() {
    return this.http.post(`${environment.api}/logout`, {}, {withCredentials: true});
  }

}
