const readline = require("readline");
const fs = require("fs");
const chalk = require("chalk");

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let pacientes = [];
let consultas = [];

function carregarDados() {
  if (fs.existsSync("pacientes.json")) {
    pacientes = JSON.parse(fs.readFileSync("pacientes.json"));
  }
  if (fs.existsSync("consultas.json")) {
    consultas = JSON.parse(fs.readFileSync("consultas.json"));
  }
}

function salvarDados() {
  fs.writeFileSync("pacientes.json", JSON.stringify(pacientes));
  fs.writeFileSync("consultas.json", JSON.stringify(consultas));
}

function adicionarPaciente(nome, telefone) {
  if (pacientes.some((paciente) => paciente.telefone === telefone)) {
    console.log(chalk.yellow("\nPaciente já cadastrado!\n"));
    return;
  }
  pacientes.push({ nome, telefone });
  salvarDados();
  console.log(chalk.green(`\nPaciente ${nome} cadastrado com sucesso!\n`));
}

function validarData(data) {
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

function validarHora(hora) {
  const regexHora = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
  return regexHora.test(hora);
}

function adicionarConsulta(pacienteIndex, data, hora, especialidade) {
  if (!validarData(data)) {
    console.log(
      chalk.red("\nFormato de data inválido. Use o formato DD-MM-AAAA.\n")
    );
    return;
  }

  if (!validarHora(hora)) {
    console.log(
      chalk.red("\nFormato de hora inválido. Use o formato HH:MM.\n")
    );
    return;
  }

  const [dia, mes, ano] = data.split("-");
  const dataFormatada = `${ano}-${mes}-${dia}`;
  const dataConsulta = new Date(`${dataFormatada} ${hora}`);
  const hoje = new Date();

  if (dataConsulta < hoje) {
    console.log(chalk.red("\nNão é possível marcar consultas retroativas.\n"));
    return;
  }

  if (
    consultas.some(
      (consulta) => consulta.data === data && consulta.hora === hora
    )
  ) {
    console.log(chalk.yellow("\nEste horário já está ocupado.\n"));
    return;
  }

  const paciente = pacientes[pacienteIndex - 1];
  if (paciente) {
    consultas.push({ paciente: paciente.nome, data, hora, especialidade });
    salvarDados();
    console.log(
      chalk.green(
        `\nConsulta marcada para ${paciente.nome} no data ${data} às ${hora}h (${especialidade})\n`
      )
    );
  } else {
    console.log(chalk.red("\nPaciente não encontrado.\n"));
  }
}

function cancelarConsulta(index) {
  if (consultas[index - 1]) {
    consultas.splice(index - 1, 1);
    salvarDados();
    console.log(chalk.green("\nConsulta cancelada com sucesso.\n"));
  } else {
    console.log(chalk.yellow("\nConsulta não encontrada.\n"));
  }
}

function listarConsultas() {
  console.log(chalk.blue("\nLista de Consultas:\n"));
  consultas.forEach((consulta, index) => {
    console.log(
      chalk.blue(
        `${index + 1}. Paciente: ${consulta.paciente} - data: ${
          consulta.data
        } - Hora: ${consulta.hora} - Especialidade: ${consulta.especialidade}`
      )
    );
  });
}

function listarPacientes() {
  console.log(chalk.blue("\nLista de Pacientes:\n"));
  pacientes.forEach((paciente, index) => {
    console.log(
      chalk.blue(
        `${index + 1}. Nome: ${paciente.nome} - Telefone: ${paciente.telefone}`
      )
    );
  });
}

function marcarConsulta() {
  listarPacientes();
  read.question("Número do Paciente: ", function (numPaciente) {
    read.question("Data (DD-MM-AAAA): ", function (data) {
      read.question("Hora (HH:MM): ", function (hora) {
        read.question("Especialidade: ", function (especialidade) {
          adicionarConsulta(numPaciente, data, hora, especialidade);
          perguntar();
        });
      });
    });
  });
}

function removerConsulta() {
  listarConsultas();
  read.question("Número da Consulta para cancelar: ", function (numConsulta) {
    cancelarConsulta(numConsulta);
    perguntar();
  });
}

function perguntar() {
  read.question(
    "\n===============================\nDigite:\n1 - Cadastrar Paciente\n2 - Listar Pacientes\n3 - Marcar Consulta\n4 - Listar Consultas\n5 - Cancelar Consulta\n0 - Sair\n===============================\nOpção: ",
    function (opcao) {
      switch (opcao) {
        case "1":
          read.question("Nome: ", function (nome) {
            read.question("Telefone: ", function (telefone) {
              adicionarPaciente(nome, telefone);
              perguntar();
            });
          });
          break;
        case "2":
          listarPacientes();
          perguntar();
          break;
        case "3":
          marcarConsulta();
          break;
        case "4":
          listarConsultas();
          perguntar();
          break;
        case "5":
          removerConsulta();
          break;
        case "0":
          read.close();
          break;
        default:
          console.log(chalk.red("Opção inválida!"));
          perguntar();
      }
    }
  );
}
console.clear();
console.log(chalk.blue("  _____ _ _       _   "));
console.log(chalk.blue(" / ____| (_)     (_)"));
console.log(chalk.blue("| |    | |_ _ __  _  ___ __ _"));
console.log(chalk.blue("| |    | | | '_ \\| |/ __/ _` |"));
console.log(chalk.blue("| |____| | | | | | | (_| (_| |"));
console.log(chalk.blue(" \\_____|_|_|_| |_|_|\\___\\__,_|"));
carregarDados();
perguntar();

read.on("close", function () {
  console.log(chalk.blue("Programa encerrado."));
  process.exit(0);
});
