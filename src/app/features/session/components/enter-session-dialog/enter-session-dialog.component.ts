import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'pkr-enter-session-dialog',
  templateUrl: './enter-session-dialog.component.html',
  styleUrls: ['./enter-session-dialog.component.scss'],
})
export class EnterSessionDialogComponent implements OnInit, OnDestroy {
  enterSessionForm: UntypedFormGroup;

  private readonly notifier$ = new Subject<void>();

  constructor(
    private readonly dialogRef: MatDialogRef<EnterSessionDialogComponent>,
    private readonly formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  create() {
    this.dialogRef.close(this.enterSessionForm.value);
  }

  createForm(): void {
    this.enterSessionForm = this.formBuilder.group({
      nickname: ['', Validators.required],
    });
  }
}
