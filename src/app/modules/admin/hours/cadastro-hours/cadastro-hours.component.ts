import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cadastro-hours',
  imports: [],
  templateUrl: './cadastro-hours.component.html',
  styleUrl: './cadastro-hours.component.less'
})
export class CadastroHoursComponent {
  @Output() closeModal = new EventEmitter<void>();

}
