import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroHoursUserComponent } from './cadastro-hours-user.component';

describe('CadastroHoursUserComponent', () => {
  let component: CadastroHoursUserComponent;
  let fixture: ComponentFixture<CadastroHoursUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroHoursUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroHoursUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
