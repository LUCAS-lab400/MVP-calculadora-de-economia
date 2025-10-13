# Calculadora de Economia

Este é um aplicativo simples para ajudar usuários a definir metas de economia, registrar gastos e acompanhar seu progresso financeiro.

# Integrantes
- Beatriz Cunha do Nascimento
- Esdras Trindade de Lima Raiz
- Ismael Wagner de Araujo
- Lucas Cipriano Costa

## Funcionalidades

- Definir meta de economia
- Registrar gastos com descrição
- Calcular total de gastos, receita média e receita marginal
- Gerar resumo mensal
- Salvar sessões no banco de dados MySQL
- Visualizar histórico de sessões

## Tecnologias utilizadas

- HTML, CSS e JavaScript
- Node.js com Express
- MySQL
- phpMyAdmin

## Como executar o projeto

Requisitos:
- Node.js instalado
- MySQL instalado e rodando
- phpMyAdmin (opcional)

Passos:

1. Clone o repositório:
   git clone https://github.com/lucas-lab400/MVP-calculadora-de-economia.git

2. Instale as dependências:
   cd backend  
   npm install

3. Configure o banco de dados:
   - Crie o banco bd_calculo_economia
   - Execute o script SQL abaixo:

     CREATE TABLE IF NOT EXISTS tabelas_bd_calculo_economia (
       id INT AUTO_INCREMENT PRIMARY KEY,
       meta DECIMAL(10,2),
       objetivo DECIMAL(10,2),
       total_gastos DECIMAL(10,2),
       gastos JSON,
       data_registro DATETIME DEFAULT CURRENT_TIMESTAMP
     );

4. Crie um arquivo `.env` com os dados de acesso ao banco:

   DB_HOST=localhost  
   DB_USER=root  
   DB_PASSWORD=1234  
   DB_NAME=bd_calculo_economia

5. Inicie o servidor:
   node server.js

6. Abra o arquivo index.html no navegador para usar o aplicativo.

> Para que o sistema funcione corretamente com o banco de dados, é necessário que o usuário configure o MySQL localmente e conecte com os dados acima. Sem isso, o armazenamento de sessões não funcionará.

## Site público

Acesse: https://lucas-lab400.github.io/MVP-calculadora-de-economia/

