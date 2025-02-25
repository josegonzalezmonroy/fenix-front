import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { ProjectsModel } from '../../../../models/interfaces/projects/response/ProjectsModel';

@Component({
  selector: 'app-cadastro-projects',
  imports: [
    FormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastro-projects.component.html',
  styleUrl: './cadastro-projects.component.less',
})
export class CadastroProjectsComponent {
  isConfirmLoading = false;
  date!: Date;

  @Output() closeModal = new EventEmitter<void>();
    
  constructor(
      private projectsService: ProjectsService,
      private notification: NotificationService
    ) {}

  projectForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    data_inicio: new FormControl('', [Validators.required]),
    data_fim: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    id_usuario_responsavel: new FormControl('EQUIS', [Validators.required]),
    data_criacao: new FormControl(new Date().toISOString(), [
      Validators.required,
    ]),
    prioridade: new FormControl('', [Validators.required])
  });

  onSubmit(): void {
      if (this.projectForm.valid) {
        this.isConfirmLoading = true;
        console.log(this.projectForm.value);
  
        this.projectsService
          .registerProject(this.projectForm.value as ProjectsModel)
          .subscribe({
            next: () => {
              setTimeout(() => {
                this.projectForm.reset();
                this.closeModal.emit();
                this.notification.successNotification(
                  'Projeto criado com sucesso'
                );
                this.isConfirmLoading = false;
              }, 500);
            },
            error: () => {
              this.isConfirmLoading = false;
              this.notification.errorNotification('Erro ao criar projeto');
            },
          });
      }
    }

    onChange(result: Date): void {
      
      console.log('onChange: ', result.toLocaleDateString());
    }
}
