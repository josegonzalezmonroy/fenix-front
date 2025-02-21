import { Component, Input } from '@angular/core';
import { UsersModel } from '../../../../models/interfaces/users/response/UsersModel';

@Component({
  selector: 'app-edit-usuario',
  imports: [],
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.less'
})
export class EditUsuarioComponent {
@Input() userEdit: UsersModel | any

}
