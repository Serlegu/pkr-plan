import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { IDeckType } from 'src/app/models/deck-type.interface';

@Component({
  selector: 'pkr-create-session-dialog',
  templateUrl: './create-session-dialog.component.html',
  styleUrls: ['./create-session-dialog.component.scss'],
})
export class CreateSessionDialogComponent implements OnInit, OnDestroy {
  sessionForm: UntypedFormGroup;
  private readonly notifier$ = new Subject<void>();

    constructor(
    private readonly dialogRef: MatDialogRef<CreateSessionDialogComponent>,
    private readonly formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  createSession() {
    this.dialogRef.close(this.sessionForm.value);
  }

  createForm(): void {
    this.sessionForm = this.formBuilder.group({
      title: ['', Validators.required],
      deckType: ['', Validators.required],
    });
  }
}
