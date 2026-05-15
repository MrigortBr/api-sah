import { DataSource } from "typeorm";
import { Municipio } from "../entities/municipio";

export async function seedMunicipio(dataSource: DataSource) {
  const repository = dataSource.getRepository(Municipio);

  const municipio = repository.create({
    ibgeMunicipio: "261160",
    nomeMunicipio: "Recife",
    ufSigla: "PE",
    geom: {
      type: "MultiPolygon",
      coordinates: [
        [
          [
            [-34.95, -8.15],
            [-34.85, -8.15],
            [-34.85, -8.0],
            [-34.95, -8.0],
            [-34.95, -8.15],
          ],
        ],
      ],
    },
  });

  await repository.save(municipio);

  console.log("Município seed criado");
}
