import { ProjectsNameModel } from '../projects/response/ProjectsNameModel';

export interface TasksModel {
  id: number;
  projeto: ProjectsNameModel;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  status: string;
  dataCriacao: Date;
}
