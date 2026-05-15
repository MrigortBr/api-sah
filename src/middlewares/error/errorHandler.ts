import { Request, Response, NextFunction } from "express";

export type DescErrors = {
  [key: string]: { message: string; description: string; statusCode: number };
};

// Logica do nome do erro ONDE O ERRO FOI CHAMADO - DESCRICAO DO ERRO, EX: PE(Project error)-UNKW(UNKWNOW)
export const descErrors: DescErrors = {
  "PE-UNKW": {
    message: "Aconteceu um erro.",
    description: "Houve um erro ao tentar realizar sua solicitação tente novamente mais tarde.",
    statusCode: 400,
  },
  "PE-NLTA": {
    message: "Você precisa estar logado!",
    description: "Você precisa estar logado, para pode acessar esta pagina.",
    statusCode: 403,
  },
  "PE-NHPR": {
    message: "Você não tem permissao!",
    description: "Você precisa estar logado, para pode acessar esta pagina.",
    statusCode: 401,
  },
  "PR-RE": {
    message: "Nada alterado!",
    description: "Os dando enviados ja existem no banco, logo nada foi alterado.",
    statusCode: 204,
  },
};

export interface ErrorResponse {
  statusCode: number;
  message: string;
  description?: string;
  stack?: string;
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let errorResponse: ErrorResponse = {
    statusCode: statusCode,
    message: err.message,
  };

  if (descErrors[err.message]) {
    const descError = descErrors[err.message];
    statusCode = descError.statusCode;

    errorResponse = {
      statusCode: descError.statusCode,
      message: descError.message,
      description: descError.description,
    };
  }

  if (process.env.STATUS === "DEV" || process.env.SHOWSTACK == "1") {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};
