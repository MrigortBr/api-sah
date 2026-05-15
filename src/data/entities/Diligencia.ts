import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DiligenciaHabilitacao } from "./DiligenciaHabilitacao";

@Entity("diligencia")
export class Diligencia {
  @PrimaryGeneratedColumn({
    type: "integer",
  })
  id: number;

  @Column({
    name: "title",
    type: "varchar",
    length: 300,
  })
  title: string;

  @OneToMany(
    () => DiligenciaHabilitacao,
    diligenciaEstabelecimento => diligenciaEstabelecimento.diligencia,
  )
  diligenciaEstabelecimentos: DiligenciaHabilitacao[];
}
