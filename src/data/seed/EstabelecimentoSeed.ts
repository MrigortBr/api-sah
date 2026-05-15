import { DataSource } from "typeorm";
import { Estabelecimento } from "../entities/estabelecimento";

export async function seedEstabelecimento(dataSource: DataSource) {
  const repository = dataSource.getRepository(Estabelecimento);

  const estabelecimento = repository.create({
    cnes: "0000477",
    nomeEstabelecimento: "Hospital Recife",
    cnpj: "11022597001325",
    gestao: "E",
    naturezaJuridica: "Hospital Público",
    latitude: -8.047589445099332,
    longitude: -34.8876616358757,
    ibgeMunicipio: "261160",
    status: "A",
    geom: {
      type: "MultiPoint",
      coordinates: [[-34.8876616358757, -8.047589445099332]],
    },
  });

  await repository.save(estabelecimento);

  console.log("Estabelecimento seed criado");
}
