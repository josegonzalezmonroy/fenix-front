export interface TasksModel{
    id: number
    id_projeto: number
    nome: string
    descricao: string
    data_inicio: Date
    data_fim: Date
    status:string
    id_usuario_responsavel: number 
    data_criacao: Date
}