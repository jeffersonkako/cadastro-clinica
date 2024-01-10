class Consulta {
  constructor(paciente, data, hora, especialidade) {
    this.paciente = paciente;
    this.data = data;
    this.hora = hora;
    this.especialidade = especialidade;
  }

  static fromData(data) {
    return new Consulta(
      data.paciente,
      data.data,
      data.hora,
      data.especialidade
    );
  }
}

module.exports = Consulta;
