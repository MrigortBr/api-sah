import { AppDataSource } from "../../data/data-source";
import { Estabelecimento } from "../../data/entities/estabelecimento";

export default class EstablishmentRepo {
  private establishmentRepo = AppDataSource.getRepository(Estabelecimento);

  async getByCnes(cnes: string): Promise<Estabelecimento> {
    try {
      return await this.establishmentRepo.findOneOrFail({
        relations: { municipio: { uf: { macrorregioes: true, regioes: true } } },
        where: { cnes },
      });
    } catch (error) {
      if (error instanceof Error && error.name === "EntityNotFoundError") throw new Error("ES-CNT");
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }
}
