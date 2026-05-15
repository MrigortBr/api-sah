import { Diligencia } from "../../data/entities/Diligencia";
import { Estabelecimento } from "../../data/entities/estabelecimento";
import { TipoHabilitacao } from "../../data/entities/tipo-habilitacao";
import ProposalRepository from "./Repository";
import { BODY_EXPECTED } from "./type";

export default class ProposalService {
  private repository = new ProposalRepository();

  async getDiligencia(): Promise<Diligencia[]> {
    return await this.repository.getDiligencia();
  }

  async getTypeHab(): Promise<Diligencia[]> {
    return await this.repository.getDiligencia();
  }

  async getTechnicians(): Promise<TipoHabilitacao[]> {
    return await this.repository.getTipoHabilitacao();
  }

  async getCnesList(): Promise<Partial<Estabelecimento>[]> {
    return await this.repository.getCnesList();
  }

  async insertNewForm(body: BODY_EXPECTED) {
    await this.repository.insertNewForm(body);
  }

  async updateForm(id: number, body: BODY_EXPECTED) {
    await this.repository.updateForm(id, body);
  }

  validateBody(body: BODY_EXPECTED) {
    const isString = (value: unknown) => typeof value === "string" && value.trim().length > 0;

    const isNumber = (value: unknown) => typeof value === "number" && !isNaN(value);

    const isArrayOfStrings = (value: unknown) => Array.isArray(value) && value.every(item => typeof item === "string");

    const isValidDate = (value: unknown) => {
      if (value instanceof Date && !isNaN(value.getTime())) {
        return true;
      }

      if (typeof value === "string") {
        return !isNaN(Date.parse(value));
      }

      return false;
    };

    if (!isString(body.saips)) {
      throw new Error("PS-BI");
    }

    if (!isString(body.nup)) {
      throw new Error("PS-BI");
    }

    if (!isString(body.situacao)) {
      throw new Error("PS-BI");
    }

    if (!isString(body.tipo_financiamento)) {
      throw new Error("PS-BI");
    }

    if (!isNumber(body.tecnico_responsavel_id)) {
      throw new Error("PS-BI");
    }

    if (!isString(body.numero_portaria)) {
      throw new Error("PS-BI");
    }

    if (!isValidDate(body.inicio_saips)) {
      throw new Error("PS-BI");
    }

    if (!isValidDate(body.entrada_decan)) {
      throw new Error("PS-BI");
    }

    if (!isValidDate(body.envio_drac)) {
      throw new Error("PS-BI");
    }

    if (!isNumber(body.inpacto_mensal)) {
      throw new Error("PS-BI");
    }

    if (!isNumber(body.parcela_unica)) {
      throw new Error("PS-BI");
    }

    if (!isString(body.cnes)) {
      throw new Error("PS-BI");
    }

    if (!isNumber(body.numero_aceleradores)) {
      throw new Error("PS-BI");
    }

    if (!isArrayOfStrings(body.tipohabilitacao)) {
      throw new Error("PS-BI");
    }

    if (!isArrayOfStrings(body.diligencia)) {
      throw new Error("PS-BI");
    }

    if (body.hitorico !== undefined) {
      if (!Array.isArray(body.hitorico)) {
        throw new Error("PS-BI");
      }

      for (const item of body.hitorico) {
        if (!isString(item.sequencia) || !isString(item.anoAlteracao) || !isString(item.codigos)) {
          throw new Error("PS-BI");
        }
      }
    }

    return true;
  }

  validateId(id: unknown) {
    const parsedId = Number(id);
    if (!(!Number.isNaN(parsedId) && parsedId > 0)) throw new Error("PS-BI");
  }

  async getProposalById(id: number) {
    return await this.repository.getFormById(id);
  }

  async listSimpleForms() {
    return await this.repository.listSimpleForms();
  }
}
