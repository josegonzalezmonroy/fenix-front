import { ProjectsNameModel } from '../projects/response/ProjectsNameModel';

export interface TasksCreateModel {
  id: number;
  projeto: number;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  status: string;
  dataCriacao: Date;
}
