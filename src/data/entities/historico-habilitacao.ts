// historico-habilitacao.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Habilitacao } from "./habilitacao";
import { TipoHabilitacao } from "./tipo-habilitacao";

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
    type: "smallint",
  })
  sequencia: number;

  @Column({
    name: "ano_alteracao",
    type: "smallint",
  })
  anoAlteracao: number;

  @Column({
    name: "codigo_habilitacao_novo",
    type: "varchar",
    length: 10,
  })
  codigoHabilitacaoNovo: string;

  @ManyToOne(
    () => Habilitacao,
    habilitacao => habilitacao.historicos,
  )
  @JoinColumn({
    name: "id_habilitacao",
  })
  habilitacao: Habilitacao;

  @ManyToOne(
    () => TipoHabilitacao,
    tipo => tipo.historicos,
  )
  @JoinColumn({
    name: "codigo_habilitacao_novo",
    referencedColumnName: "codigo",
  })
  tipoHabilitacaoNovo: TipoHabilitacao;
}
