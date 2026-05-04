import express from "express";
import {
  ValidarCadastroPaciente,
  ValidarLoginUsuario,
} from "./controller/controller_usuarios.ts";
import { validarCadastroExercicio, listarExercicios, removerExercicio } from "./controller/controller_exercicios.ts";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

/**************Rotas************** */

/****************Pacientes****************** */
app.post("/cadastrarPaciente", async (req, res) => {
  let data = req.body;

  let cadastrarPaciente = await ValidarCadastroPaciente(data);

  res.status(cadastrarPaciente.status);
  res.json(cadastrarPaciente);
});

app.post("/login", async (req, res) => {
  let email = req.body.email;
  let senha = req.body.senha;

  let login = await ValidarLoginUsuario(email, senha);

  res.status(login.status_code);
  res.json(login);
});


/****************Exercícios****************** */
app.post("/cadastrarExercicio", async (req, res) => {
  let data = req.body;

  let cadastrarExercicio = await validarCadastroExercicio(data);

  res.status(cadastrarExercicio.status);
  res.json(cadastrarExercicio);
});

app.get("/listarExercicios", async (_req, res) => {
  let resultado = await listarExercicios();

  res.status(resultado.status);
  res.json(resultado);
});

app.delete("/exercicio/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { email, senha } = req.body;

  try {
    let resultado = await removerExercicio(id, email, senha);
    res.status(resultado.status);
    res.json(resultado);
  } catch (error) {
    console.log("Erro ao deletar exercício:", error);
    res.status(500).json({ message: String(error) });
  }
});


app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
