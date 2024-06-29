import { Injectable } from '@angular/core';
import { AppService } from '../app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _appService: AppService,
    private _http: HttpClient
  ) { }

  user!: any;

  login(pseudo: string, password: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/auth/login";
    let data = {
      pseudo: pseudo,
      password: password
    }
    return this._http.post<any>(url, data);

  }

  register(formdata: any): Observable<any> {
    let url = this._appService.baseUrl + "/api/auth/register";
    return this._http.post<any>(url, formdata);
  }
}
