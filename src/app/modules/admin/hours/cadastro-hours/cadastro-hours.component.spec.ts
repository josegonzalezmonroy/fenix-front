import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroHoursComponent } from './cadastro-hours.component';

describe('CadastroHoursComponent', () => {
  let component: CadastroHoursComponent;
  let fixture: ComponentFixture<CadastroHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroHoursComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
