import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LoaderService } from 'src/app/Services/Loader/loader.service';
import { AlertDialogComponent } from '../../dialogs/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(
    private _router: Router,
    protected _loaderService: LoaderService,
    private _authService: AuthService,
    private _notifierService: NotifierService,
    private _dialog: MatDialog
  ) {

  }

  hide = true;
  isClose = true;
  isLoading_login = false;
  isLoading_register = false;

  // matcher
  matcher: ErrorStateMatcher = new ErrorStateMatcher();

  // form controls login
  pseudoFormcontrol = new FormControl('', [Validators.required]);
  passwordFormcontrol = new FormControl('', [Validators.required]);

  // form controls register
  pseudoRegisterFormcontrol = new FormControl('', [Validators.required]);
  passwordRegisterFormcontrol = new FormControl('', [Validators.required, Validators.minLength(8)]);
  nameFormcontrol = new FormControl('', [Validators.required]);
  sexeFormcontrol = new FormControl('', [Validators.required]);
  telFormcontrol = new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
  passwordConfirmationFormcontrol = new FormControl('', [Validators.required]);

  // variables login
  pseudo: string = '';
  password: string = '';

  // variables register
  pseudoRegister: string = '';
  passwordRegister: string = '';
  name: string = '';
  sexe: string = '';
  tel: string = '';
  password_confirmation: string = '';

  // variables
  isRegisterVisible = false;
  isDisplay = false;

  async setVisible() {
    this.isDisplay = true;
  }

  async setInVisible() {
    this.isDisplay = false;
  }

  /**
   * Display login form
   */
  activeLoginForm() {
    this.setInVisible().then(_ => {
      this.isRegisterVisible = false;

      // clear pseudo an password
      this.password = '';
      this.pseudo = '';
    });

  }

  /**
   * Display register form
   */
  activeRegisterForm() {
    this.setVisible().then(_ => {
      this.isRegisterVisible = true;

      // clear pseudo an password
      this.password = '';
      this.pseudo = '';
    });
  }

  /**
   * Handle login request 
   */
  onSubmit() {
    if (this.pseudoFormcontrol.valid && this.passwordFormcontrol.valid) {

      try {
        // start loader 
        this.isLoading_login = true;
        this._authService.login(this.pseudo, this.password).pipe(
          catchError((error: HttpErrorResponse) => {
            this.isLoading_login = false;
            if (error.status === 401) {
              // display error
              this._notifierService.notify('error', 'Pseudo ou mot de passe incorrect');
              console.error(error);
            }
            return throwError(error);
          })
        ).subscribe(res => {
          // stop laoder
          this.isLoading_login = false;

          // save user on session
          sessionStorage.setItem('familytree-user', JSON.stringify(res));

          // go to home page
          this._router.navigateByUrl('/home/family');

        });
      } catch (error) {
        // stop laoder
        this.isLoading_login = false;

        // display error
        this._notifierService.notify('error', 'Une erreur est survenue.');
        console.error(error);

      }
    } else {
      // display error
      this._notifierService.notify('error', 'Formulaire invalide');
    }

  }

  /**
   * Handle register request
   */
  register() {
    if (this.pseudoRegisterFormcontrol.valid &&
      this.nameFormcontrol.valid &&
      this.sexeFormcontrol.valid &&
      this.passwordRegisterFormcontrol.valid &&
      this.passwordConfirmationFormcontrol.valid
    ) {

      // check if phone are not empty
      if (this.tel.trim()) {
        if (!this.telFormcontrol.valid) {
          this._notifierService.notify('error', 'Téléphone invalide');
          return;
        }
      }

      // check if password are same
      if (this.passwordRegister == this.password_confirmation) {
        try {
          // start loader
          this.isLoading_register = true;

          // form data
          let formdata = {
            name: this.name,
            pseudo: this.pseudoRegister,
            sexe: this.sexe,
            password: this.passwordRegister,
            password_confirmation: this.password_confirmation,
            tel: this.tel
          };

          // send request
          this._authService.register(formdata).pipe(
            catchError((error: HttpErrorResponse) => {
              this.isLoading_register = false;
              if (error.status !== 200) {
                // display error
                this._notifierService.notify('error', error.error.message);
                console.error(error.error);
              }
              return throwError(error);
            })
          ).subscribe(response => {
            // stop loader
            this.isLoading_register = false;

            // display dialog
            let dialog = this._dialog.open(AlertDialogComponent, {
              data: {
                title: "Félicitation",
                message: "Votre compte a été crée avec succès",
                pseudo: this.pseudoRegister,
                password: this.passwordRegister
              }, disableClose: true
            });

            dialog.afterClosed().subscribe(result => {
              if (result) {
                this.isRegisterVisible = false;
                // on vide le formulaire
                this.name = " ";
                this.passwordRegister = " ";
                this.password_confirmation = " ";
                this.sexe = " ";
                this.tel = " ";
                this.pseudoRegister = " ";
              }
            });
          });
        } catch (error) {
          this.isLoading_register = false;
          console.log(error);
          this._notifierService.notify('error', 'Une erreur est survenue.');

        }

      } else {
        this._notifierService.notify('error', 'Mot de passe incorrect');
      }

    } else {
      this._notifierService.notify('error', 'Tous les champs sont obligatoire');
    }

  }

}
