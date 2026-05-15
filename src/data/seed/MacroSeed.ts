import { DataSource } from "typeorm";
import { MacrorregiaoSaude } from "../entities/macrorregiao-saude";

export async function seedMacrorregiaoSaude(dataSource: DataSource) {
  const repository = dataSource.getRepository(MacrorregiaoSaude);

  const macrorregiao = repository.create({
    ibgeMacro: "0001",
    nomeMacro: "Macrorregião Metropolitana",
    ufSigla: "PE",
    casosNovosSus2026: 3500,

    geom: {
      type: "MultiPolygon",
      coordinates: [
        [
          [
            [-35.1, -8.3],
            [-34.7, -8.3],
            [-34.7, -7.9],
            [-35.1, -7.9],
            [-35.1, -8.3],
          ],
        ],
      ],
    },
  });

  await repository.save(macrorregiao);

  console.log("Macrorregião seed criada");
}
