# 💰 Calculadora de Economia

Este é um aplicativo simples para ajudar usuários a definir metas de economia, registrar gastos e acompanhar seu progresso financeiro.

---

## 🚀 Funcionalidades

- Definir meta de economia
- Registrar gastos com descrição
- Calcular total de gastos, receita média e receita marginal
- Gerar resumo mensal
- Salvar sessões no banco de dados MySQL
- Visualizar histórico de sessões

---

## 🛠️ Tecnologias utilizadas

- HTML, CSS e JavaScript (front-end)
- Node.js com Express (back-end)
- MySQL (banco de dados)
- phpMyAdmin (gerenciador de banco)

---

## 📦 Como executar o projeto

### 🔧 Requisitos

- Node.js instalado
- MySQL instalado e rodando
- phpMyAdmin (opcional para visualizar o banco)

### 📁 Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
Instale as dependências:

bash
cd backend
npm install
Configure o banco de dados:

Crie o banco bd_calculo_economia

Execute o script SQL para criar a tabela:

sql
CREATE TABLE IF NOT EXISTS tabelas_bd_calculo_economia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  meta DECIMAL(10,2),
  objetivo DECIMAL(10,2),
  total_gastos DECIMAL(10,2),
  gastos JSON,
  data_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);
Inicie o servidor:

bash
node server.js
Abra o index.html no navegador para usar o app.