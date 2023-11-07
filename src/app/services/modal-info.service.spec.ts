import { TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EMPTY } from 'rxjs';
import { ModalInfoComponent } from '../libs/components/shared/modal-info/modal-info.component';

import { ModalInfoService } from './modal-info.service';

describe('ModalInfoService', () => {
  let service: ModalInfoService;

  const dialogMock = {
    translate: {},
    accept: () => {},
    close: () => {},
    afterClosed: () => EMPTY
  };

  const matDialogMock = {
    open: () => dialogMock,
    closeAll: () => EMPTY
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalInfoComponent],
      providers: [
        ModalInfoComponent,
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MatDialog, useValue: matDialogMock },
        UntypedFormBuilder
      ]
    });
    service = TestBed.inject(ModalInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
