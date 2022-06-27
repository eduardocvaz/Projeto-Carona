import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projeto-Carona';

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AddDialogComponent, {
      width: '30%'
    });
    this.dialog.afterAllClosed.subscribe(() => {
      window.location.reload();
    });
  }
}
