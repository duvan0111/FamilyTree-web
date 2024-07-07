import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { EventService } from 'src/app/Services/Event/event.service';
import { FamilyService } from 'src/app/Services/Family/family.service';
import { MemberService } from 'src/app/Services/Member/member.service';
import { FamilyDialogComponent } from '../../dialogs/family-dialog/family-dialog.component';
import { AppService } from 'src/app/Services/app/app.service';

@Component({
  selector: 'app-detail-family',
  templateUrl: './detail-family.component.html',
  styleUrls: ['./detail-family.component.css']
})
export class DetailFamilyComponent {

  listeMembre: any[] = [];
  listeEvents: any[] = [];
  displayedColumnsMember: string[] = ['nom', 'sexe', 'date', 'lieu', 'action'];
  dataSource = new MatTableDataSource<any>(this.listeMembre);

  constructor(
    protected _appService: AppService,
    private _memberService: MemberService,
    private _authService: AuthService,
    protected _familyService: FamilyService,
    private _eventService: EventService,
    private _notifierService: NotifierService,
    protected _router: Router,
    private _dialog: MatDialog
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
        this.listeMembre = res;

        console.log(res);


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

  /**
   * Handle get families events request
   */
  getEvents() {
    try {
      this._eventService.getFamilyEvents(this._familyService.currentFamily.id, this._authService.user.token).pipe(
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
        this.listeEvents = res.data;
      });

    } catch (error) {
      // log error
      this._notifierService.notify('error', 'Une erreur est survenue');

      // log
      console.error(error);

    }
  }

  openFamilyDialog() {
    let dialog = this._dialog.open(FamilyDialogComponent, {
      data: {
        mode: 'edit',
        element: this._familyService.currentFamily
      },
    });

    dialog.afterClosed().subscribe(result => {
      console.log(result);

    });
  }

  openMemberDialog(mode: string, element: any) {
    let dialog = this._dialog.open(FamilyDialogComponent, {
      data: {
        mode: 'edit',
        element: this._familyService.currentFamily
      },
    });

    dialog.afterClosed().subscribe(result => {
      console.log(result);

    });
  }

  ngOnInit() {
    this._familyService.getCurrent();
    this.getFamilieMember();
    console.log(this._familyService.currentFamily);

  }

}
