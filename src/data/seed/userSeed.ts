import { DataSource } from "typeorm";
import { Uf } from "../entities/uf";
import { User } from "../entities/User";

export async function seedUser(dataSource: DataSource) {
  const repository = dataSource.getRepository(User);

  const user = repository.create({
    email: "igortbr0412@hotmail.com",
    name: "Igor",
    password: "$2a$04$ZLxE3K8RHmNA.ekIspuwtOtnzx4aTQiyfQflewMsIvq0hhZiJpAYO",
    surname: "Lins",
    permission: { id: 1 },
    emailVerified: true,
  });

  await repository.save(user);

  console.log("Usuarios seed criada");
}
