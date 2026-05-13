import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estabelecimento } from "./estabelecimento";

@Entity("desabilitacao")
export class Desabilitacao {
  @PrimaryGeneratedColumn({
    name: "id_desabilitacao",
  })
  idDesabilitacao: number;

  @Column({
    type: "char",
    length: 7,
  })
  cnes: string;

  @Column({
    name: "ano_desabilitacao",
    type: "smallint",
  })
  anoDesabilitacao: number;

  @Column({
    name: "portaria_desabilitacao",
    type: "varchar",
    length: 300,
    nullable: true,
  })
  portariaDesabilitacao?: string;

  @Column({
    name: "numero_sei",
    type: "varchar",
    length: 80,
    nullable: true,
  })
  numeroSei?: string;

  @ManyToOne(
    () => Estabelecimento,
    est => est.desabilitacoes,
  )
  @JoinColumn({
    name: "cnes",
  })
  estabelecimento: Estabelecimento;
}
