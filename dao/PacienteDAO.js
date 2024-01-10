const fs = require("fs");

class PacienteDAO {
  static carregarPacientes() {
    if (fs.existsSync("pacientes.json")) {
      return JSON.parse(fs.readFileSync("pacientes.json"));
    }
    return [];
  }

  static salvarPacientes(pacientes) {
    fs.writeFileSync("pacientes.json", JSON.stringify(pacientes));
  }
}

module.exports = PacienteDAO;
