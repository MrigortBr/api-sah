import { DescErrors, descErrors } from "../../middlewares/error/errorHandler";

export const errorsEstablishment: DescErrors = {
  "ES-CI": {
    message: "Codigo CNES é invalido.",
    description: "Codigo Cnes é invalido informe um valido",
    statusCode: 400,
  },
  "ES-CNT": {
    message: "Codigo CNES não foi encontado na base de dados.",
    description: "Codigo nao foi encontado, preencha manualmente.",
    statusCode: 400,
  },
};

Object.assign(descErrors, errorsEstablishment);
