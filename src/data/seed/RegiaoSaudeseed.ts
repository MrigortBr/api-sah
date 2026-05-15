import { DataSource } from "typeorm";
import { RegiaoSaude } from "../entities/regiao-saude";

export async function seedRegiaoSaude(
  dataSource: DataSource,
) {
  const repository = dataSource.getRepository(RegiaoSaude);

  const regiao = repository.create({
    ibgeRegiao: "00001",
    nomeRegiao: "Região Metropolitana",
    ufSigla: "PE",
    ibgeMacro: "0001",

    geom: {
      type: "MultiPolygon",
      coordinates: [
        [
          [
            [-35.00, -8.20],
            [-34.80, -8.20],
            [-34.80, -8.00],
            [-35.00, -8.00],
            [-35.00, -8.20],
          ],
        ],
      ],
    },
  });

  await repository.save(regiao);

  console.log("Região de saúde seed criada");
}