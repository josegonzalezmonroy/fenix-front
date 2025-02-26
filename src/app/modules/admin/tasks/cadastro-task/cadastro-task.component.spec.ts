import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTaskComponent } from './cadastro-task.component';

describe('CadastroTaskComponent', () => {
  let component: CadastroTaskComponent;
  let fixture: ComponentFixture<CadastroTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
