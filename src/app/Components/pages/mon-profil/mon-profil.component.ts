import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css']
})
export class MonProfilComponent {
  @Input() user!: any;

  hide = true;
  isLoading_register = false;
  allowEdit = false;

  // matcher
  matcher: ErrorStateMatcher = new ErrorStateMatcher();

  // form controls register
  pseudoRegisterFormcontrol = new FormControl('', [Validators.required]);
  passwordRegisterFormcontrol = new FormControl('', [Validators.required, Validators.minLength(8)]);
  nameFormcontrol = new FormControl('', [Validators.required]);
  sexeFormcontrol = new FormControl('', [Validators.required]);
  telFormcontrol = new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
  passwordConfirmationFormcontrol = new FormControl('', [Validators.required]);

  // variables register
  pseudoRegister: string = '';
  passwordRegister: string = '';
  name: string = '';
  sexe: string = '';
  tel: string = '';
  password_confirmation: string = '';

  initVariable() {
    this.pseudoRegister = this.user.user.pseudo;
    this.name = this.user.user.name;
    this.sexe = this.user.user.sexe;
    this.tel = this.user.user.tel;
  }

  ngOnInit() {
    this.initVariable();
  }
}
