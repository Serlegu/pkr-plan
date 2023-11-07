import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'pkr-create-user-story-dialog',
  templateUrl: './create-user-story-dialog.component.html',
  styleUrls: ['./create-user-story-dialog.component.scss'],
})
export class CreateUserStoryDialogComponent implements OnInit, OnDestroy {
  userStoryForm: UntypedFormGroup;

  private readonly notifier$ = new Subject<void>();

  constructor(
    private readonly dialogRef: MatDialogRef<CreateUserStoryDialogComponent>,
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
    this.dialogRef.close(this.userStoryForm.value);
  }

  createForm(): void {
    this.userStoryForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: ['', Validators.required],
    });
  }
}
