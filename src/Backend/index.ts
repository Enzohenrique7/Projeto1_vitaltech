import express from "express";
import {
  ValidarCadastroPaciente,
  ValidarLoginUsuario,
} from "./controller/controller_usuarios.ts";

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

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
