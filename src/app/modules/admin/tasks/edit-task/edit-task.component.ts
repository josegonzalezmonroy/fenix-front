import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TasksModel } from '../../../../models/interfaces/tasks/TasksModel';

@Component({
  selector: 'app-edit-task',
  imports: [],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.less'
})
export class EditTaskComponent {
  @Input() taskEdit!: TasksModel;
  @Output() closeModal = new EventEmitter<void>();
}
