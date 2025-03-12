export interface UsuarioResponsavelModel {
    id: number;
    nome: string;
    email: string;
    ativo: boolean;
    ultimoLogin: Date;
}