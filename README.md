# Fenix Front

Este é o projeto **Fenix Front**, uma aplicação Angular configurada com diversas dependências e scripts úteis para desenvolvimento e produção.

## Requisitos

- Node.js (versão recomendada: 16 ou superior)
- Angular CLI (instalado globalmente)

## Scripts Disponíveis

Os seguintes scripts estão disponíveis no `package.json`:

- `ng`: Executa o comando Angular CLI.
- `start`: Inicia o servidor de desenvolvimento.
- `build`: Realiza o build da aplicação para produção.
- `watch`: Realiza o build em modo de observação (watch) com a configuração de desenvolvimento.
- `test`: Executa os testes unitários.

Para executar qualquer um dos scripts acima, utilize o comando:

```bash
npm run <nome-do-script>
```

## Dependências Principais

As principais dependências do projeto incluem:

- **@angular/core**: Framework Angular.
- **ng-zorro-antd**: Biblioteca de componentes UI para Angular.
- **jwt-decode**: Biblioteca para decodificar tokens JWT.
- **rxjs**: Biblioteca para programação reativa.

## Dependências de Desenvolvimento

As dependências de desenvolvimento incluem:

- **@angular/cli**: Ferramenta CLI para Angular.
- **typescript**: Suporte para TypeScript.

## Funcionalidades

O projeto inclui as seguintes funcionalidades principais:

1. **Login e Cadastro de Usuários**:
   - Gerenciamento de perfis e permissões.

2. **Dashboard**:
   - Visão geral de projetos, atividades e horas trabalhadas.

3. **Página de Projetos**:
   - Listar, criar, editar e excluir projetos.

4. **Página de Atividades**:
   - Listar, criar, editar e excluir atividades vinculadas a um projeto.

5. **Página de Lançamentos de Horas**:
   - Formulário para lançar horas em uma atividade específica.

## Como Iniciar

1. Clone o repositório:
   ```bash
   git clone https://github.com/josegonzalezmonroy/fenix-front
   cd fenix-front
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run start
   ```

4. Acesse a aplicação no navegador em `http://localhost:4200`.

## Estrutura do Projeto

A estrutura básica do projeto segue o padrão Angular, com módulos, componentes e serviços organizados em pastas.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto é privado e não possui uma licença pública.
