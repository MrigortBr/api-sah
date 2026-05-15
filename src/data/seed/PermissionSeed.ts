import { DataSource } from "typeorm";
import { Permission } from "../entities/Permission";

export async function seedPermission(dataSource: DataSource) {
  const repository = dataSource.getRepository(Permission);

  const perm = repository.create([
    {
      name: "Desenvolvedor",
      cod: "dev",
    },
    {
      name: "Tecnico",
      cod: "tec",
    },
  ]);

  await repository.save(perm);

  console.log("Permissoes seed criada");
}
