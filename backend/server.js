require('dotenv').config();
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const PORT = 3001;

// Habilita CORS para todas as origens
app.use(cors());

// Permite receber JSON
app.use(express.json());

// Conexão com o MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL com sucesso!');
});

// Rotas da calculadora
const calculadoraRoutes = require('./routes/calculadora');
app.use('/api', calculadoraRoutes);

// Rota para visualizar sessões salvas
app.get('/api/sessoes', (req, res) => {
  connection.query('SELECT * FROM tabelas_bd_calculo_economia', (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar dados');
    }
    res.json(results);
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
