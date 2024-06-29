import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  title = this.data.title;
  message = this.data.message;
  pseudo = this.data.pseudo;
  password = this.data.password
  /**
   * TYPE
   * 
   * success
   * error
   */
  type = this.data.type;

}
