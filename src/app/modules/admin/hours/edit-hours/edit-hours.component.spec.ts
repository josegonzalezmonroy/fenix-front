import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHoursComponent } from './edit-hours.component';

describe('EditHoursComponent', () => {
  let component: EditHoursComponent;
  let fixture: ComponentFixture<EditHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHoursComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
