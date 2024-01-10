const readline = require("readline");
const chalk = require("chalk");

class MenuView {
  constructor(pacienteController, consultaController) {
    this.pacienteController = pacienteController;
    this.consultaController = consultaController;
    this.read = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  mostrarMenuPrincipal() {
    console.clear();
    console.log(chalk.blue("  _____ _ _       _   "));
    console.log(chalk.blue(" / ____| (_)     (_)"));
    console.log(chalk.blue("| |    | |_ _ __  _  ___ __ _"));
    console.log(chalk.blue("| |    | | | '_ \\| |/ __/ _` |"));
    console.log(chalk.blue("| |____| | | | | | | (_| (_| |"));
    console.log(chalk.blue(" \\_____|_|_|_| |_|_|\\___\\__,_|"));
    this.perguntar();
  }

  perguntar() {
    this.read.question(
      "\n===============================\nDigite:\n1 - Cadastrar Paciente\n2 - Listar Pacientes\n3 - Marcar Consulta\n4 - Listar Consultas\n5 - Cancelar Consulta\n0 - Sair\n===============================\nOpção: ",
      (opcao) => {
        switch (opcao) {
          case "1":
            this.pacienteController.adicionarPaciente(this.read, () =>
              this.perguntar()
            );
            break;
          case "2":
            this.pacienteController.listarPacientes();
            this.perguntar();
            break;
          case "3":
            this.consultaController.adicionarConsulta(this.read, () =>
              this.perguntar()
            );
            break;
          case "4":
            this.consultaController.listarConsultas();
            this.perguntar();
            break;
          case "5":
            this.consultaController.removerConsulta(this.read, () =>
              this.perguntar()
            );
            break;
          case "0":
            this.encerrarPrograma();
            break;
          default:
            console.log(chalk.red("Opção inválida!"));
            this.perguntar();
        }
      }
    );
  }

  encerrarPrograma() {
    console.log(chalk.blue("Programa encerrado."));
    console.log(chalk.green("Desenvolvido por: Jefferson.dev"));
    this.read.close();
  }
}

module.exports = MenuView;
