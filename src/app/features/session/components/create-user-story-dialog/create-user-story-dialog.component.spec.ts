import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserStoryDialogComponent } from './create-user-story-dialog.component';

describe('CreateUserStoryDialogComponent', () => {
  let component: CreateUserStoryDialogComponent;
  let fixture: ComponentFixture<CreateUserStoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserStoryDialogComponent]
    });
    fixture = TestBed.createComponent(CreateUserStoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
