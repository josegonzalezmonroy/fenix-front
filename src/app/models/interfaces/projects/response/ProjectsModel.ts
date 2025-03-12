import { UsuarioResponsavelModel } from "../../users/response/UsuarioResponsavelModel";

export interface ProjectsModel {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  status: string;
  usuarioResponsavel: UsuarioResponsavelModel;
  dataCriacao: Date;
  prioridade: string;
}
