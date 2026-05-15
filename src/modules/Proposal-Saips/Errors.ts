import { DescErrors, descErrors } from "../../middlewares/error/errorHandler";

export const errorsEstablishment: DescErrors = {
  "PS-BI": {
    message: "A Habilitação enviada é invalida.",
    description: "Codigo Cnes é invalido informe um valido",
    statusCode: 400,
  },
};

Object.assign(descErrors, errorsEstablishment);
