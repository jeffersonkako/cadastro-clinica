const Consulta = require("../models/Consulta");
const ConsultaDAO = require("../dao/ConsultaDAO");
const Utils = require("../utils/utils");
const chalk = require("chalk");

class ConsultaController {
  constructor(pacienteController) {
    this.consultas = ConsultaDAO.carregarConsultas();
    this.pacienteController = pacienteController;
  }

  validarData(data) {
    const regexData = /^(\d{2})-(\d{2})-(\d{4})$/;
    const partesData = data.match(regexData);

    if (!partesData) return false;

    const dia = parseInt(partesData[1], 10);
    const mes = parseInt(partesData[2], 10) - 1;
    const ano = parseInt(partesData[3], 10);

    const dataObj = new Date(ano, mes, dia);
    return (
      dataObj.getDate() === dia &&
      dataObj.getMonth() === mes &&
      dataObj.getFullYear() === ano
    );
  }

  validarHora(hora) {
    const regexHora = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    return regexHora.test(hora);
  }

  horarioOcupado(data, hora) {
    return this.consultas.some(
      (consulta) => consulta.data === data && consulta.hora === hora
    );
  }

  adicionarConsulta(read, callback) {
    this.pacienteController.listarPacientes();
    read.question("Número do Paciente: ", (numPaciente) => {
      read.question("Data (DD-MM-AAAA): ", (data) => {
        if (!this.validarData(data)) {
          console.log(
            chalk.red("\nFormato de data inválido. Use o formato DD-MM-AAAA.\n")
          );
          callback();
          return;
        }

        const hoje = new Date();
        const [dia, mes, ano] = data.split("-");
        const dataFormatada = `${ano}-${mes}-${dia}`;
        const dataConsulta = new Date(`${dataFormatada}`);
        if (dataConsulta < hoje) {
          console.log(
            chalk.red("\nNão é possível marcar consultas retroativas.\n")
          );
          callback();
          return;
        }

        read.question("Hora (HH:MM): ", (hora) => {
          if (!this.validarHora(hora)) {
            console.log(
              chalk.red("\nFormato de hora inválido. Use o formato HH:MM.\n")
            );
            callback();
            return;
          }

          if (this.horarioOcupado(data, hora)) {
            console.log(chalk.yellow("\nEste horário já está ocupado.\n"));
            callback();
            return;
          }

          read.question("Especialidade: ", (especialidade) => {
            const paciente =
              this.pacienteController.pacientes[parseInt(numPaciente) - 1];
            if (!paciente) {
              console.log(chalk.red("\nPaciente não encontrado.\n"));
              callback();
              return;
            }

            const novaConsulta = new Consulta(
              paciente.nome,
              data,
              hora,
              especialidade
            );
            this.consultas.push(novaConsulta);
            ConsultaDAO.salvarConsultas(this.consultas);
            console.log(
              chalk.green(
                `\nConsulta marcada com sucesso para ${paciente.nome}.\n`
              )
            );
            callback();
          });
        });
      });
    });
  }

  listarConsultas() {
    console.log(chalk.blue("\nLista de Consultas:\n"));
    this.consultas.forEach((consulta, index) => {
      console.log(
        chalk.blue(
          `${index + 1}. Paciente: ${consulta.paciente} - Data: ${
            consulta.data
          } - Hora: ${consulta.hora} - Especialidade: ${consulta.especialidade}`
        )
      );
    });
  }

  removerConsulta(read, callback) {
    this.listarConsultas();
    read.question("Número da Consulta para cancelar: ", (numConsulta) => {
      const index = parseInt(numConsulta) - 1;
      if (this.consultas[index]) {
        this.consultas.splice(index, 1);
        ConsultaDAO.salvarConsultas(this.consultas);
        console.log(chalk.green("\nConsulta cancelada com sucesso.\n"));
        callback();
      } else {
        console.log(chalk.red("\nConsulta não encontrada.\n"));
        callback();
      }
    });
  }
}

module.exports = ConsultaController;
