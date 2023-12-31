import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface IModalData {
  title: string;
  msg: string;
  [key: string]: string | boolean | number;
}

@Component({
  selector: 'pkr-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
})
export class ModalInfoComponent {
  public dialogRef: MatDialogRef<ModalInfoComponent> = inject(MatDialogRef);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IModalData
  ) {  }

  close(): void {
    this.dialogRef.close(false);
  }

  accept(): void {
    this.dialogRef.close(true);
  }
}
