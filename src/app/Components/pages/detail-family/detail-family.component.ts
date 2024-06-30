import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { FamilyService } from 'src/app/Services/Family/family.service';
import { MemberService } from 'src/app/Services/Member/member.service';

@Component({
  selector: 'app-detail-family',
  templateUrl: './detail-family.component.html',
  styleUrls: ['./detail-family.component.css']
})
export class DetailFamilyComponent {

  listeMembre: any[] = [];
  displayedColumns: string[] = ['titre', 'niveau', 'chapitre', 'sujet', 'action'];
  dataSource = new MatTableDataSource<any>(this.listeMembre);

  constructor(
    private _memberService: MemberService,
    private _authService: AuthService,
    private _familyService: FamilyService,
    private _notifierService: NotifierService,
    protected _router: Router
  ) {
    _familyService.getCurrent();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Handle get family members request
   */
  getFamilieMember() {
    try {
      this._memberService.getFamilyMembers(this._familyService.currentFamily.id, this._authService.user.token).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status !== 200) {
            // display error
            this._notifierService.notify('error', 'Une erreur est survenue.');
            console.error(error);
          }
          return throwError(error);
        })
      ).subscribe(res => {
        // get response
        this.listeMembre = res.data;

        // set data
        this.dataSource = new MatTableDataSource<any>(this.listeMembre);
      });

    } catch (error) {
      // log error
      this._notifierService.notify('error', 'Une erreur est survenue');

      // log
      console.error(error);

    }

  }

  ngOnInit() {
    this.getFamilieMember();
  }

}
