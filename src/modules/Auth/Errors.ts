import dotenv from "dotenv";
import { descErrors, DescErrors } from "../../middlewares/error/errorHandler";

dotenv.config({ quiet: true });

// Logica do nome do erro ONDE O ERRO FOI CHAMADO - DESCRICAO DO ERRO, EX: IC(Init Controller)-ETS(Error Tests)
const errosInit: DescErrors = {
  "US-EI": {
    message: "Email incorreto.",
    description: "Para prosseguir com o registro informe um email valido!",
    statusCode: 400,
  },
  "US-ER": {
    message: "Email já registrado.",
    description: "Para prosseguir com o registro informe um email nao registrado!",
    statusCode: 400,
  },
  "US-NE": {
    message: "Nome vazio.",
    description: "Para prosseguir com o registro informe o seu nome!",
    statusCode: 400,
  },
  "US-PE": {
    message: "Senha vazia.",
    description: "Para prosseguir com o registro informe uma senha!",
    statusCode: 400,
  },
  "US-PL": {
    message: "Senha invalida.",
    description: `Informe uma senha entre ${process.env.minSize} - ${process.env.maxSize} caracteres para prosseguir com o registro!`,
    statusCode: 400,
  },
  "US-SPE": {
    message: "Sistema indisponivel no momento, tente novamente mais tarde!",
    description: "no momento o sistema de cadastro está indisponivel tente novamente mais tarde",
    statusCode: 400,
  },
  "US-EN": {
    message: "Email não registrado.",
    description: "Para prosseguir com o login informe um email registrado!",
    statusCode: 400,
  },
  "US-PI": {
    message: "Senha incorreta.",
    description: "A senha informada está incorreta!",
    statusCode: 400,
  },
  "US-UK": {
    message: "Houve um erro inesperado, tente novamente mais tarde!",
    description: "Aconteceu um erro inesperado por favor tente novamente mais tarde, se o erro persistir entre em contato conosco.",
    statusCode: 400,
  },
  "US-TI": {
    message: "O link enviado é invalido solicite um novo!",
    description: "Token enviado está vazio.",
    statusCode: 400,
  },
  "US-CI": {
    message: "O CPF informado é invalido!",
    description: "Token enviado está vazio.",
    statusCode: 400,
  },
  "US-NI": {
    message: "O Numero informado é invalido!",
    description: "Token enviado está vazio.",
    statusCode: 400,
  },
  "US-EV": {
    message: "O Email enviado foi validado!",
    description: "Token enviado está vazio.",
    statusCode: 400,
  },
};

Object.assign(descErrors, errosInit);
