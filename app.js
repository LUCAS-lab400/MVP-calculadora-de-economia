// Variáveis globais
let metaEconomia = 0;
let totalGastos = 0;
let gastosRegistrados = [];

// Elementos do DOM
const metaInput = document.getElementById('metaInput');
const gastoInput = document.getElementById('gastoInput');
const descricaoInput = document.getElementById('descricaoInput');
const metaDisplay = document.getElementById('metaDisplay');
const gastosDisplay = document.getElementById('gastosDisplay');
const limiteDisplay = document.getElementById('limiteDisplay');
const mensagemAlerta = document.getElementById('mensagemAlerta');
const mensagemSessao = document.getElementById('mensagemSessao');
const resumoMensal = document.getElementById('resumoMensal');

// Botões
document.getElementById('definirMetaBtn').addEventListener('click', definirMeta);
document.getElementById('registrarGastoBtn').addEventListener('click', registrarGasto);
document.getElementById('gerarResumoBtn').addEventListener('click', () => {
  gerarResumo();
  salvarSessaoNoBanco();
});

// Função para definir a meta de economia
function definirMeta() {
  metaEconomia = parseFloat(metaInput.value);
  if (isNaN(metaEconomia) || metaEconomia <= 0) {
    mensagemAlerta.textContent = "Insira uma meta válida.";
    return;
  }

  metaDisplay.textContent = metaEconomia.toFixed(2);
  atualizarLimite();
  metaInput.value = '';
  mensagemAlerta.textContent = "Meta definida! Vamos economizar!";
}

// Função para registrar gastos
function registrarGasto() {
  const valor = parseFloat(gastoInput.value);
  const descricao = descricaoInput.value;

  if (!isNaN(valor) && valor > 0) {
    totalGastos += valor;
    gastosRegistrados.push({ valor, descricao });
    gastosDisplay.textContent = totalGastos.toFixed(2);
    gastoInput.value = '';
    descricaoInput.value = '';
    atualizarLimite();
  }
}

// Atualiza o limite restante com base na meta e nos gastos
function atualizarLimite() {
  const limite = metaEconomia - totalGastos;
  limiteDisplay.textContent = limite.toFixed(2);

  if (limite < 0) {
    mensagemAlerta.textContent = "Atenção! Você ultrapassou seu limite! Corte gastos.";
  } else if (limite < metaEconomia * 0.3) {
    mensagemAlerta.textContent = "Cuidado! Você está perto do limite.";
  } else {
    mensagemAlerta.textContent = "Tudo sob controle! Continue assim.";
  }
}

// Gera o resumo mensal com todos os dados
function gerarResumo() {
  const economia = metaEconomia - totalGastos;

  let resumoHTML = `
    <p>Meta: R$ ${metaEconomia.toFixed(2)}</p>
    <p>Total Gastos: R$ ${totalGastos.toFixed(2)}</p>
    <p>Economia: R$ ${economia.toFixed(2)}</p>
    <p>${economia >= 0 ? '✅ Parabéns! Você atingiu sua meta!' : '❌ Você não atingiu sua meta.'}</p>
  `;

  if (gastosRegistrados.length > 0) {
    resumoHTML += `<h3>Detalhe dos Gastos:</h3><ul>`;
    gastosRegistrados.forEach(gasto => {
      resumoHTML += `<li>${gasto.descricao || 'Sem descrição'}: R$ ${gasto.valor.toFixed(2)}</li>`;
    });
    resumoHTML += `</ul>`;
  }

  resumoMensal.innerHTML = resumoHTML;
}

// Calcula quanto economizar por dia
function calcular() {
  const valorInput = document.getElementById('valor');
  const resultadoDiv = document.getElementById('resultado');
  const valor = parseFloat(valorInput.value);

  if (!isNaN(valor) && valor > 0) {
    const porDia = valor / 30;
    resultadoDiv.textContent = `Você precisa economizar R$ ${porDia.toFixed(2)} por dia durante 30 dias.`;
  } else {
    resultadoDiv.textContent = 'Por favor, insira um valor válido.';
  }
}

// Salva sessão no banco
function salvarSessaoNoBanco() {
  const objetivo = parseFloat(document.getElementById('valor').value);
  if (isNaN(objetivo) || objetivo <= 0) {
    mensagemSessao.textContent = "Insira um objetivo válido antes de salvar.";
    mensagemSessao.style.color = "red";
    return;
  }

  const meta = metaEconomia;
  const total = totalGastos;
  const gastos = gastosRegistrados;

  fetch('http://localhost:3001/api/salvarSessao', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ meta, objetivo, total_gastos: total, gastos })
  })
  .then(async res => {
    if (!res.ok) {
      const erroTexto = await res.text();
      throw new Error(`Erro ${res.status}: ${erroTexto}`);
    }
    return res.json();
  })
  .then(data => {
    console.log('Sessão salva com sucesso:', data);
    mensagemSessao.textContent = "✅ Sessão salva com sucesso!";
    mensagemSessao.style.color = "green";
  })
  .catch(err => {
    console.error('Erro ao salvar sessão:', err);
    mensagemSessao.textContent = "❌ Erro ao salvar sessão.";
    mensagemSessao.style.color = "red";
  });
}


// Carrega sessões salvas
function carregarSessoesSalvas() {
  fetch('http://localhost:3001/api/listarSessoes')
    .then(res => res.json())
    .then(sessoes => {
      if (!Array.isArray(sessoes)) {
        console.error('Resposta inesperada:', sessoes);
        return;
      }

      let html = '<h3>Histórico de Sessões</h3><ul>';
      sessoes.forEach(sessao => {
        html += `
          <li>
            <strong>Meta:</strong> R$ ${Number(sessao.meta).toFixed(2)} |
            <strong>Objetivo:</strong> R$ ${Number(sessao.objetivo).toFixed(2)} |
            <strong>Gastos:</strong> R$ ${Number(sessao.total_gastos).toFixed(2)} |
            <strong>Data:</strong> ${sessao.data_registro ? new Date(sessao.data_registro).toLocaleString() : 'Sem data'}
          </li>
        `;
      });
      html += '</ul>';
      resumoMensal.innerHTML += html;
    })
    .catch(err => {
      console.error('Erro ao carregar sessões:', err);
    });
}
