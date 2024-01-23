import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snack: MatSnackBar) {
  }

  openSnack(message: string) {
    this._snack.open(message, 'ok', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: 'right'
    })
  }
}
