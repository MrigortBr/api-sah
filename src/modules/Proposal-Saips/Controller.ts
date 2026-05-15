import { Request, Response, NextFunction } from "express";
import { Controller, Get, Patch, Put } from "../../base/routerDecorator";
import { verifyLoginStatus } from "../../middlewares/login/verifyLogin";
import ProposalService from "./Service";
import { BODY_EXPECTED } from "./type";
import "./Errors";
import { verifyPermissionTecnhic } from "../../middlewares/permission/permission";

@Controller("/proposal", [verifyLoginStatus])
export default class ProposalController {
  private service = new ProposalService();

  @Get("", [verifyPermissionTecnhic])
  async getDataForForm(req: Request, res: Response, next: NextFunction) {
    try {
      const typeHab = await this.service.getTypeHab();
      const diligencia = await this.service.getDiligencia();

      const technicians = await this.service.getTechnicians();
      const cnes = await this.service.getCnesList();
      res.success({ typeHab, diligencia, technicians, cnes }, "Informações das proposta listadas!", "", 200);
    } catch (error) {
      next(error);
    }
  }

  @Get("/simpleForms")
  async listSimpleForms(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.listSimpleForms();

      res.success(response, "Informações das proposta listadas!", "", 200);
    } catch (error) {
      next(error);
    }
  }

  @Get("/list/:id", [verifyPermissionTecnhic])
  async getProposalById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      this.service.validateId(id);
      const response = await this.service.getProposalById(Number(id));
      res.success(response, "Informações das proposta listadas!", "", 200);
    } catch (error) {
      next(error);
    }
  }

  @Put("", [verifyPermissionTecnhic])
  async insertNewForm(req: Request, res: Response, next: NextFunction) {
    try {
      const body: BODY_EXPECTED = req.body;
      this.service.validateBody(body);
      await this.service.insertNewForm(body);
      res.success({}, "Habilitacao criada com sucesso!", "", 200);
    } catch (error) {
      next(error);
    }
  }

  @Patch("/:id", [verifyPermissionTecnhic])
  async updateForm(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const body: BODY_EXPECTED = req.body;
      this.service.validateBody(body);
      this.service.validateId(id);
      await this.service.updateForm(Number(id), body);
      res.success({}, "Dados Atualizado com sucesso!", "", 200);
    } catch (error) {
      next(error);
    }
  }
}
