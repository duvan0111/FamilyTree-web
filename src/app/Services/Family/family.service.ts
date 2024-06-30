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

  /**
   * Current selected family 
   */
  currentFamily!: any;

  /**
   * 
   * @param element set value of selected family
   */
  setCurrent(element: any) {
    this.currentFamily = element;
    localStorage.setItem('familytree-current-family', JSON.stringify(element));
  }

  /**
   * get Value of current selected family
   */
  getCurrent() {
    let familyStr = localStorage.getItem('familytree-current-family');
    if (familyStr) {
      this.currentFamily = JSON.parse(JSON.stringify(familyStr));
    }
  }

  rejoindre(code: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/auth/register";
    return this._http.get<any>(url);
  }

  creer(formData: FormData, token: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/families";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post<any>(url, formData, { headers });
  }

  update(formData: FormData, id: number, token: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/families/" + id;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post<any>(url, formData, { headers });
  }

  getAll(token: string): Observable<any> {
    console.log(token);

    let url = this._appService.baseUrl + "/api/families/";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<any>(url, { headers });
  }

  delete(id: number, token: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/families/" + id;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.delete<any>(url, { headers });
  }

  getFamilyTree(idFamily: number, token: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/families/" + idFamily + "/tree";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<any>(url, { headers });
  }


}
