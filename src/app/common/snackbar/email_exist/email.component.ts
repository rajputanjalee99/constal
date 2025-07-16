import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './email.component.html'
})
export class EmailExistComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<EmailExistComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

}
