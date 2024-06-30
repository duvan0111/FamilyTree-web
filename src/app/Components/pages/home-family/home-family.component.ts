import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { FamilyService } from 'src/app/Services/Family/family.service';
import { ImageService } from 'src/app/Services/Image/image.service';
import { DeleteComponent } from '../../dialogs/delete/delete.component';

@Component({
  selector: 'app-home-family',
  templateUrl: './home-family.component.html',
  styleUrls: ['./home-family.component.css']
})
export class HomeFamilyComponent {
  constructor(
    protected _authService: AuthService,
    private _familyService: FamilyService,
    private _imageService: ImageService,
    private _notifierService: NotifierService,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

  isLoading_create_family = false;
  isLoading_join_family = false;
  isLoading_get_family = false;
  isLoading_delete_family = false;
  hasFamilly = true;

  // matcher
  matcher: ErrorStateMatcher = new ErrorStateMatcher();
  familyList: any[] = [];

  // rejoindre famille ------------------------------------------------------

  // form control
  codefamilleFormcontrol = new FormControl('', [Validators.required]);

  // variables
  codefamille = '';

  // creer famille ------------------------------------------------------

  // form control
  nomFamilleFormcontrol = new FormControl('', [Validators.required]);

  // variables
  nomFamille = '';

  go_to_detail_page(element: any) {
    // code ...
    this._familyService.setCurrent(element);
    this._router.navigateByUrl('/home/family/detail');
  }

  go_to_tree_page(element: any) {
    // code ...
    this._familyService.setCurrent(element);
    this._router.navigateByUrl('/home/family/tree');
  }

  /**
   * Handle delete family request
   * @param element 
   */
  deleteFamily(element: any) {
    let dialog = this._dialog.open(DeleteComponent, {
      data: {
        title: "Nom de la famille ...",
        message: "Confirmer la suppréssion de cette famille ?"
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        // start loader
        this.isLoading_delete_family = true;

        // send request
        this._familyService.delete(element.id, this._authService.user.token).pipe(
          catchError((error: HttpErrorResponse) => {
            this.isLoading_delete_family = false;
            if (error.status !== 200) {
              // display error
              this._notifierService.notify('error', 'Une erreur est survenue.');
              console.error(error);
            }
            return throwError(error);
          })
        ).subscribe(res => {
          // response
          this.getFamilles();
        });
      }
    });
  }

  /**
   * Handle get user families request
   */
  getFamilles() {
    try {
      this.isLoading_get_family = true;
      this._familyService.getAll(this._authService.user.token).pipe(
        catchError((error: HttpErrorResponse) => {
          this.isLoading_get_family = false;
          if (error.status !== 200) {
            // display error
            this._notifierService.notify('error', 'Une erreur est survenue.');
            console.error(error);
          }
          return throwError(error);
        })
      ).subscribe(response => {

        // top loader
        this.isLoading_get_family = true;

        // set data
        this.familyList = response.data;

        // log 
        console.log(response);

      });

    } catch (error) {
      // top loader
      this.isLoading_get_family = true;

      // notify
      this._notifierService.notify('error', 'Une erreur est survenue.');

      console.error(error);
    }
  }

  /**
   * Handle create user family request
   */
  creerFamille() {
    if (this.nomFamilleFormcontrol.valid) {
      console.log('arrive');

      try {
        this.isLoading_create_family = true;
        let f = new FormData();
        f = this._imageService.formDateCurrentImage;
        f.append('name', this.nomFamille);
        this._familyService.creer(f, this._authService.user.token).pipe(
          catchError((error: HttpErrorResponse) => {
            this.isLoading_create_family = false;
            if (error.status !== 200) {
              // display error
              this._notifierService.notify('error', 'Une erreur est survenue.');
              console.error(error);
            }
            return throwError(error);
          })
        ).subscribe(response => {
          this.isLoading_create_family = false;

          // notify
          this._notifierService.notify('success', 'La famille ' + this.nomFamille + " a été ajouté avec succès");
          console.error(response);

        });

      } catch (error) {
        this.isLoading_create_family = false;

        this._notifierService.notify('error', 'Une erreur est survenue');
        console.error(error);
      }
    }

  }

  /**
   * Handle join family request
   */
  rejoindreFamille() {
    if (this.codefamilleFormcontrol.valid) {
      try {
        // start loader
        this.isLoading_join_family = true;
        this._familyService.rejoindre(this.codefamille).pipe(
          catchError((error: HttpErrorResponse) => {
            this.isLoading_join_family = false;
            if (error.status !== 200) {
              // display error
              this._notifierService.notify('error', 'Une erreur est survenue.');
              console.error(error.message);
            }
            return throwError(error);
          })
        ).subscribe(res => {

          // stop loader
          this.isLoading_join_family = false;

          // notify
          this._notifierService.notify('success', 'Bienvenue dans la famille ....');

          // refresh data
          this.getFamilles();
        });
      } catch (error) {
        // stop loader
        this.isLoading_join_family = false;

        // display error
        this._notifierService.notify('error', 'Une erreur est survenue.');
        console.error(error);

      }
    }

  }

  ngOnInit() {
    this.getFamilles();
  }

}
