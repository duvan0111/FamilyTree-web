import { Injectable } from '@angular/core';
import { AppService } from '../app/app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(
    private _appService: AppService,
    private _http: HttpClient
  ) { }

  rejoindre(code: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/auth/register";
    return this._http.get<any>(url);
  }

  creer(formData: FormData, token: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/families";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post<any>(url, formData, { headers });
  }
}
