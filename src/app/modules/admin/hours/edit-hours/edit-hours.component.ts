import { Component, Input } from '@angular/core';
import { HoursModel } from '../../../../models/interfaces/hours/HoursModel';

@Component({
  selector: 'app-edit-hours',
  imports: [],
  templateUrl: './edit-hours.component.html',
  styleUrl: './edit-hours.component.less'
})
export class EditHoursComponent {
@Input() hourEdit!: HoursModel;
}
