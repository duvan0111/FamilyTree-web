import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { FamilyService } from 'src/app/Services/Family/family.service';
import { ImageService } from 'src/app/Services/Image/image.service';
import { LoaderService } from 'src/app/Services/Loader/loader.service';

@Component({
  selector: 'app-family-dialog',
  templateUrl: './family-dialog.component.html',
  styleUrls: ['./family-dialog.component.css']
})
export class FamilyDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected _loaderService: LoaderService,
    private _imageService: ImageService,
    private _familyService: FamilyService,
    private _notifierService: NotifierService,
    protected _authService: AuthService,
    private _ref: MatDialogRef<FamilyDialogComponent>
  ) { }

  mode = this.data.mode;
  isLoading_create_family = false;
  element = this.data.element;

  // matcher
  matcher: ErrorStateMatcher = new ErrorStateMatcher();

  // form control
  nomFamilleFormcontrol = new FormControl('', [Validators.required]);

  // variables
  nomFamille = '';

  add() {
    if (this.nomFamilleFormcontrol.valid) {

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

          // hide dialog
          this._ref.close(true);

        });

      } catch (error) {
        this.isLoading_create_family = false;

        this._notifierService.notify('error', 'Une erreur est survenue');
        console.error(error);
      }
    }
  }

  edit() {
    if (this.nomFamilleFormcontrol.valid) {

      try {
        this.isLoading_create_family = true;
        let f = new FormData();
        f = this._imageService.formDateCurrentImage;
        f.append('name', this.nomFamille);
        f.append('_method', 'put');
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
          this._notifierService.notify('success', 'La famille ' + this.nomFamille + " a été modifié avec succès");
          console.error(response);

          // hide dialog
          this._ref.close(true);

        });

      } catch (error) {
        this.isLoading_create_family = false;

        this._notifierService.notify('error', 'Une erreur est survenue');
        console.error(error);
      }
    }
  }

  valid() {
    if (this.mode == 'add') {
      this.add();
    } else if (this.mode == 'edit') {
      this.edit();
    } else {
      console.log('UNKNOW METHOD');

    }
  }

  ngOnInit() {
    this.nomFamille = this.element.name;
  }
}
