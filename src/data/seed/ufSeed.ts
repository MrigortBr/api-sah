import { DataSource } from "typeorm";
import { Uf } from "../entities/uf";

export async function seedUf(dataSource: DataSource) {
  const repository = dataSource.getRepository(Uf);

  const uf = repository.create({
    ufSigla: "PE",
    nomeUf: "Pernambuco",
    casosNovosSus2026: 1200,

    geom: {
      type: "MultiPolygon",
      coordinates: [
        [
          [
            [-34.95, -8.05],
            [-34.95, -8.05],
            [-34.95, -8.05],
            [-34.95, -8.05],
            [-34.95, -8.05],
          ],
        ],
      ],
    },
  });

  await repository.save(uf);

  console.log("UF seed criada");
}
