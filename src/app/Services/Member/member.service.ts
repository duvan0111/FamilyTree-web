import { Injectable } from '@angular/core';
import { AppService } from '../app/app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private _appService: AppService,
    private _http: HttpClient
  ) { }

  /**
   * Get members of family
   * @param idFamily 
   * @param token 
   * @returns 
   */
  getFamilyMembers(idFamily: number, token: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/families/" + idFamily + "/members";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<any>(url, { headers });
  }

  /**
   * Add familie 's member
   * @param idFamily 
   * @param token 
   * @returns 
   */
  addFamiliyMember(idFamily: number, formData: any, token: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/families/" + idFamily + "/members";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post<any>(url, formData, { headers });
  }

  /**
   * Ajouter un parent a un membre d'une famille
   * @param idFamily 
   * @param idMember 
   * @param formData 
   * @param token 
   * @returns 
   */
  addFamiliyMemberParent(idFamily: number, idMember: number, formData: any, token: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/families/" + idFamily + "/members/" + idMember + "/parents";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post<any>(url, formData, { headers });
  }

  editFamiliyMemberParent(idFamily: number, idMember: number, formData: any, token: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/families/" + idFamily + "/members/" + idMember + "/parents";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post<any>(url, formData, { headers });
  }

  getFamilyMemberById(idFamily: number, idMember: number, token: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/families/" + idFamily + "/members/" + idMember + "/parents";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<any>(url, { headers });
  }

  deleteFamilyMember(idFamily: number, idMember: number, token: string): Observable<any> {
    let url = this._appService.baseUrl + "/api/families/" + idFamily + "/members/" + idMember + "/parents";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.delete<any>(url, { headers });
  }


}
