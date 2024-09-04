import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  http = inject(HttpClient);

  forgot(body: any) {
    return this.http.post(`${environment.api}/forgot`, body);
  }

  reset(body: any) {
    return this.http.post(`${environment.api}/reset`, body);
  }

}
