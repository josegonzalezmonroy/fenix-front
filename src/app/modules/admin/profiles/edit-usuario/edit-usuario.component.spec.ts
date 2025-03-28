import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsuarioComponent } from './edit-usuario.component';

describe('EditUsuarioComponent', () => {
  let component: EditUsuarioComponent;
  let fixture: ComponentFixture<EditUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUsuarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
