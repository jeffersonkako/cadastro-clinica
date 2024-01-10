const Paciente = require("../models/Paciente");
const PacienteDAO = require("../dao/PacienteDAO");
const chalk = require("chalk");

class PacienteController {
  constructor() {
    this.pacientes = PacienteDAO.carregarPacientes();
  }

  adicionarPaciente(read, callback) {
    read.question("Nome: ", (nome) => {
      read.question("Telefone: ", (telefone) => {
        if (this.pacientes.some((paciente) => paciente.telefone === telefone)) {
          console.log(chalk.yellow("\nPaciente já cadastrado!\n"));
          callback();
          return;
        }
        const novoPaciente = new Paciente(nome, telefone);
        this.pacientes.push(novoPaciente);
        PacienteDAO.salvarPacientes(this.pacientes);
        console.log(
          chalk.green(`\nPaciente ${nome} cadastrado com sucesso!\n`)
        );
        callback();
      });
    });
  }

  listarPacientes() {
    console.log(chalk.blue("\nLista de Pacientes:\n"));
    this.pacientes.forEach((paciente, index) => {
      console.log(
        chalk.blue(
          `${index + 1}. Nome: ${paciente.nome} - Telefone: ${
            paciente.telefone
          }`
        )
      );
    });
  }
}

module.exports = PacienteController;
