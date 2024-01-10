class Utils {
  static validarData(data) {
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

  static validarHora(hora) {
    const regexHora = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    return regexHora.test(hora);
  }
}

module.exports = Utils;
