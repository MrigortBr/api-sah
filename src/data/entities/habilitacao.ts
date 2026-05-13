import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estabelecimento } from "./estabelecimento";
import { TipoHabilitacao } from "./tipo-habilitacao";
import { HistoricoHabilitacao } from "./historico-habilitacao";

@Entity("habilitacao")
export class Habilitacao {
  @PrimaryGeneratedColumn({
    name: "id_habilitacao",
  })
  idHabilitacao: number;

  @Column({
    type: "char",
    length: 7,
  })
  cnes: string;

  @Column({
    name: "codigo_habilitacao",
    type: "varchar",
    length: 10,
  })
  codigoHabilitacao: string;

  @Column({
    name: "ano_primeira_habilitacao",
    type: "smallint",
  })
  anoPrimeiraHabilitacao: number;

  @Column({
    name: "portaria_sas",
    type: "varchar",
    length: 300,
    nullable: true,
  })
  portariaSas?: string;

  @Column({
    name: "portaria_gm_recurso",
    type: "varchar",
    length: 300,
    nullable: true,
  })
  portariaGmRecurso?: string;

  @Column({
    name: "portaria_gm_recurso_ii",
    type: "varchar",
    length: 300,
    nullable: true,
  })
  portariaGmRecursoIi?: string;

  @Column({
    name: "valor_repasse",
    type: "numeric",
    precision: 15,
    scale: 2,
    nullable: true,
  })
  valorRepasse?: number;

  @Column({
    name: "num_aceleradores_cobaltos",
    type: "smallint",
    nullable: true,
  })
  numAceleradoresCobaltos?: number;

  @Column({
    name: "habilitacao_em_conjunto",
    type: "varchar",
    length: 300,
    nullable: true,
  })
  habilitacaoEmConjunto?: string;

  @ManyToOne(
    () => Estabelecimento,
    est => est.habilitacoes,
  )
  @JoinColumn({
    name: "cnes",
  })
  estabelecimento: Estabelecimento;

  @ManyToOne(
    () => TipoHabilitacao,
    tipo => tipo.habilitacoes,
  )
  @JoinColumn({
    name: "codigo_habilitacao",
    referencedColumnName: "codigo",
  })
  tipoHabilitacao: TipoHabilitacao;

  @OneToMany(
    () => HistoricoHabilitacao,
    hist => hist.habilitacao,
  )
  historicos: HistoricoHabilitacao[];
}
