import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalInfoComponent } from '../components/shared/modal-info/modal-info.component';

@Injectable({
  providedIn: 'root',
})
export class ModalInfoService {
  constructor(private readonly matDialog: MatDialog) {}

  public open(
    data: any,
    width = '700px',
    disableClose = true,
    height = 'auto'
  ): MatDialogRef<ModalInfoComponent> {
    return this.matDialog.open(ModalInfoComponent, {
      data,
      width,
      disableClose,
      height,
    });
  }
}
