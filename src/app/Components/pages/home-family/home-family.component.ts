import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NotifierService } from 'angular-notifier';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { FamilyService } from 'src/app/Services/Family/family.service';
import { ImageService } from 'src/app/Services/Image/image.service';

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
    private _notifierService: NotifierService
  ) { }

  isLoading_create_family = false;
  isLoading_join_family = false;

  // matcher
  matcher: ErrorStateMatcher = new ErrorStateMatcher();

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

}
