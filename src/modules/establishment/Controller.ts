import { Request, Response, NextFunction } from "express";
import { Controller, Route } from "../../base/routerDecorator";
import EstablishmentService from "./Service";
import "./Errors";
import { toEstabelecimentoDTO } from "../../data/DTO/EstabelecimentoResponseDTO";
import { verifyLoginStatus } from "../../middlewares/login/verifyLogin";

@Controller("/establishment", [verifyLoginStatus])
export default class EstablishmentController {
  private service = new EstablishmentService();

  @Route("/listbycnes/:cnes")
  async listByCnes(req: Request, res: Response, next: NextFunction) {
    try {
      const { cnes } = req.params;
      this.service.validarCNES(cnes);
      const data = await this.service.getByCnes(cnes);

      res.success(toEstabelecimentoDTO(data), "Estabelecimento encontrado com sucesso!", "", 200);
    } catch (error) {
      next(error);
    }
  }
}
