import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Habilitacao } from "./habilitacao";
import { HistoricoHabilitacao } from "./historico-habilitacao";

@Entity("tipo_habilitacao")
export class TipoHabilitacao {
  @PrimaryGeneratedColumn()
  id_tipo_habilitacao: number;

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
    habilitacao => habilitacao.idHabilitacao,
  )
  habilitacoes: Habilitacao[];

  @OneToMany(
    () => HistoricoHabilitacao,
    historico => historico.idHistorico,
  )
  historicos: HistoricoHabilitacao[];
}
