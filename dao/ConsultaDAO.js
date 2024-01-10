const fs = require("fs");

class ConsultaDAO {
  static carregarConsultas() {
    if (fs.existsSync("consultas.json")) {
      return JSON.parse(fs.readFileSync("consultas.json"));
    }
    return [];
  }

  static salvarConsultas(consultas) {
    fs.writeFileSync("consultas.json", JSON.stringify(consultas));
  }
}

module.exports = ConsultaDAO;
