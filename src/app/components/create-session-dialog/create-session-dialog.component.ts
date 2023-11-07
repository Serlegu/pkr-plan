import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'pkr-create-session-dialog',
  templateUrl: './create-session-dialog.component.html',
  styleUrls: ['./create-session-dialog.component.scss'],
})
export class CreateSessionDialogComponent implements OnInit, OnDestroy {
  sessionForm: UntypedFormGroup;
  private readonly notifier$ = new Subject<void>();

  deckTypes: any[] = [
    { description: 'standard', id: 0 },
    { description: 'custom', is: 1 },
    { description: 'spanish', is: 2 },
  ];

  constructor(
    private readonly dialogRef: MatDialogRef<CreateSessionDialogComponent>,
    private readonly formBuilder: UntypedFormBuilder
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
