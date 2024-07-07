import { Injectable } from '@angular/core';
import { AppService } from '../app/app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private _appService: AppService,
    private _http: HttpClient
  ) { }

  /**
   * 
   * @param idFamily get family events request
   * @param token 
   * @returns 
   */
  getFamilyEvents(idFamily: number, token: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/families/" + idFamily + "/events";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<any>(url, { headers });
  }

}
