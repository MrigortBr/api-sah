import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estabelecimento } from "./estabelecimento";
import { HistoricoHabilitacao } from "./historico-habilitacao";
import { User } from "./User";

@Entity("habilitacao")
export class Habilitacao {
  @PrimaryGeneratedColumn({
    name: "id_habilitacao",
  })
  idHabilitacao: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_user" })
  user: User;

  @Column({
    type: "varchar",
    length: 7,
  })
  cnes: string;

  @Column({
    name: "numero_saips",
    type: "varchar",
    length: 10,
  })
  numeroSaips: string;

  @Column({
    name: "numero_unico_protocolo",
    type: "varchar",
    length: 20,
  })
  numeroUnicoProtocolo: string;

  @Column({
    name: "tipo_financiamento",
    type: "varchar",
  })
  tipoFinanciamento: string;

  @Column({
    name: "situacao",
    type: "varchar",
  })
  situacao: string;

  @Column({
    name: "portaria_habilitacao",
    type: "varchar",
    length: 300,
    nullable: true,
  })
  portariaHabilitacao?: string;

  @Column({
    name: "num_aceleradores_cobaltos",
    type: "smallint",
    nullable: true,
  })
  numAceleradoresCobaltos?: number;

  @Column({
    name: "inicio_saips",
    type: "timestamp",
  })
  inicioSaips: Date;

  @Column({
    name: "entrada_decan",
    type: "timestamp",
  })
  entradaDecan: Date;

  @Column({
    name: "envio_drac",
    type: "timestamp",
  })
  envioDrac: Date;

  @Column({
    name: "parcela_unica",
    type: "numeric",
    precision: 15,
    scale: 2,
    nullable: true,
  })
  parcelaUnica?: number;

  @Column({
    name: "inpacto_mensal",
    type: "numeric",
    precision: 15,
    scale: 2,
    nullable: true,
  })
  inpactoMensal?: number;

  @ManyToOne(
    () => Estabelecimento,
    estabelecimento => estabelecimento.habilitacoes,
  )
  @JoinColumn({
    name: "cnes",
  })
  estabelecimento: Estabelecimento;

  @OneToMany(
    () => HistoricoHabilitacao,
    historico => historico.habilitacao,
  )
  historicos: HistoricoHabilitacao[];
}
