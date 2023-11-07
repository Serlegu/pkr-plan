import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterSessionDialogComponent } from './enter-session-dialog.component';

describe('EnterSessionDialogComponent', () => {
  let component: EnterSessionDialogComponent;
  let fixture: ComponentFixture<EnterSessionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterSessionDialogComponent],
    });
    fixture = TestBed.createComponent(EnterSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
