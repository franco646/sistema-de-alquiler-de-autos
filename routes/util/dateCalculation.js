function calcularDias(date1, date2) {
  const dateOne = date1.split('-');
  const dateTwo = date2.split('-');

  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(dateOne[0], dateOne[1], dateOne[2]);
  const secondDate = new Date(dateTwo[0], dateTwo[1], dateTwo[2]);

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  return diffDays;
}

function calcularTotal(date1, date2, val) {
  const valorUnitario = val;
  const dias = calcularDias(date1, date2) + 1;
  const total = Number(dias * valorUnitario);

  return total;
}

module.exports = calcularTotal;
