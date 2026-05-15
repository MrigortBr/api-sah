// historico-habilitacao.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Habilitacao } from "./habilitacao";

@Entity("historico_habilitacao")
export class HistoricoHabilitacao {
  @PrimaryGeneratedColumn({
    name: "id_historico",
  })
  idHistorico: number;

  @Column({
    name: "id_habilitacao",
    type: "integer",
  })
  idHabilitacao: number;

  @Column({
    type: "varchar",
  })
  sequencia: string;

  @Column({
    name: "ano_alteracao",
    type: "smallint",
  })
  anoAlteracao: number;

  @Column({
    name: "codigos",
    type: "varchar",
    length: 300,
  })
  codigos: string;

  @ManyToOne(
    () => Habilitacao,
    habilitacao => habilitacao.historicos,
  )
  @JoinColumn({
    name: "id_habilitacao",
  })
  habilitacao: Habilitacao;
}
