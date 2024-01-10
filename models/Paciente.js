class Paciente {
  constructor(nome, telefone) {
    this.nome = nome;
    this.telefone = telefone;
  }

  static fromData(data) {
    return new Paciente(data.nome, data.telefone);
  }
}

module.exports = Paciente;
