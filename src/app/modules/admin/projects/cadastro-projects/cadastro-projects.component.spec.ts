import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroProjectsComponent } from './cadastro-projects.component';

describe('CadastroProjectsComponent', () => {
  let component: CadastroProjectsComponent;
  let fixture: ComponentFixture<CadastroProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
