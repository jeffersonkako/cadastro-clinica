# Projeto de Cadastro de Clínica 

## Descrição
Este projeto é um sistema de cadastro simples para uma clínica, desenvolvido em Node.js. Ele permite gerenciar pacientes e consultas, incluindo adicionar novos pacientes, listar pacientes, marcar consultas, listar consultas, cancelar consultas e salvar os dados em arquivos JSON dentro do projeto.

## Estrutura do Projeto
O projeto segue a arquitetura MVC (Model-View-Controller) e está organizado da seguinte forma:

- `models/`: Contém os modelos de dados para Paciente e Consulta.
- `views/`: Contém a lógica de interação com o usuário (CLI).
- `controllers/`: Contém a lógica de negócios para manipulação de pacientes e consultas.
- `dao/`: Contém a lógica de acesso aos dados (leitura e escrita de arquivos JSON).
- `utils/`: Contém funções utilitárias.
- `app.js`: Arquivo principal que inicia a aplicação.

## Pré-requisitos
Antes de iniciar, certifique-se de ter o Node.js instalado em seu sistema. Você pode baixar e instalar o Node.js em [nodejs.org](https://nodejs.org/).

## Instalação
Para configurar o projeto em sua máquina local, siga estas etapas:

1. Clone o repositório do projeto:
      
      ```bash
      git clone https://github.com/jeffersonkako/cadastro-clinica.git
      ```
2. Navegue até a pasta do projeto clonado:
        
        ```bash
        cd cadastro-clinica
        ```

3. Não há dependências de terceiros a serem instaladas para este projeto.

## Executando o Projeto
Para executar o aplicativo, siga estas etapas:

1. No terminal, na raiz do projeto, execute o seguinte comando:
  
        ```bash
        node app.js
        ```

2. O menu principal será exibido. Siga as instruções na tela para interagir com o sistema.

## Como Usar
Após iniciar o aplicativo, você pode:

- Digitar `1` para cadastrar um novo paciente.
- Digitar `2` para listar todos os pacientes.
- Digitar `3` para marcar uma nova consulta.
- Digitar `4` para listar todas as consultas.
- Digitar `5` para cancelar uma consulta.
- Digitar `0` para sair do aplicativo.

  
