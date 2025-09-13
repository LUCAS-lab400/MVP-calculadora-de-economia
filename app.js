const form = document.getElementById('form');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const valorTotal = parseFloat(document.getElementById('valorTotal').value);
  const dias = parseInt(document.getElementById('dias').value);

  if (isNaN(valorTotal) || isNaN(dias) || dias <= 0) {
    resultado.textContent = 'Preencha os campos corretamente.';
    return;
  }

  const porDia = valorTotal / dias;
  const porSemana = valorTotal / (dias / 7);
  const porMes   = valorTotal / (dias / 30);
  const porAno   = valorTotal / (dias / 365);

  resultado.innerHTML = `
    <p>Para juntar <strong>R$${valorTotal.toFixed(2)}</strong> em <strong>${dias}</strong> dias, você precisa economizar:</p>
    <ul>
      <li>R$${porDia.toFixed(2)} por dia</li>
      <li>R$${porSemana.toFixed(2)} por semana</li>
      <li>R$${porMes.toFixed(2)} por mês</li>
      <li>R$${porAno.toFixed(2)} por ano</li>
    </ul>
  `;
});
