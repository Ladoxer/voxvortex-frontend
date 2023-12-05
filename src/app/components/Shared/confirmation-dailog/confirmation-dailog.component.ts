import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dailog',
  templateUrl: './confirmation-dailog.component.html',
  styleUrls: ['./confirmation-dailog.component.css']
})
export class ConfirmationDailogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ){}
}
