import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Habilitacao } from "./habilitacao";
import { HistoricoHabilitacao } from "./historico-habilitacao";

@Entity("tipo_habilitacao")
export class TipoHabilitacao {
  @PrimaryColumn({
    type: "varchar",
    length: 10,
  })
  codigo: string;

  @Column({
    type: "varchar",
    length: 250,
  })
  descricao: string;

  @Column({
    type: "varchar",
    length: 30,
  })
  categoria: string;

  @OneToMany(
    () => Habilitacao,
    habilitacao => habilitacao.tipoHabilitacao,
  )
  habilitacoes: Habilitacao[];

  @OneToMany(
    () => HistoricoHabilitacao,
    historico => historico.tipoHabilitacaoNovo,
  )
  historicos: HistoricoHabilitacao[];
}
