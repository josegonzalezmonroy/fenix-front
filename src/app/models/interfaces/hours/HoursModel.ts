import { TasksModel } from '../tasks/TasksModel';
import { UsersNameModel } from '../users/response/UsersNameModel';

export interface HoursModel {
  id: number;
  atividade: TasksModel;
  usuario: UsersNameModel;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  dataRegistro: Date;
}
