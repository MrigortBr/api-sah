import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estabelecimento } from "./estabelecimento";

@Entity("reativacao")
export class Reativacao {
  @PrimaryGeneratedColumn({
    name: "id_reativacao",
  })
  idReativacao: number;

  @Column({
    type: "char",
    length: 7,
  })
  cnes: string;

  @Column({
    name: "ano_reativacao",
    type: "smallint",
  })
  anoReativacao: number;

  @Column({
    name: "portaria_reativacao",
    type: "varchar",
    length: 300,
    nullable: true,
  })
  portariaReativacao?: string;

  @Column({
    name: "numero_sei",
    type: "varchar",
    length: 80,
    nullable: true,
  })
  numeroSei?: string;

  @ManyToOne(
    () => Estabelecimento,
    est => est.reativacoes,
  )
  @JoinColumn({
    name: "cnes",
  })
  estabelecimento: Estabelecimento;
}
