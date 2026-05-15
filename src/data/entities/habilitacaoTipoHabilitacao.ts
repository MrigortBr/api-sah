import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Habilitacao } from "./habilitacao";
import { TipoHabilitacao } from "./tipo-habilitacao";

@Entity("habilitacao_tipo_habilitacao")
export class HabilitacaoTipoHabilitacao {
  @PrimaryColumn({
    name: "id_habilitacao",
  })
  idHabilitacao: number;

  @PrimaryColumn({
    name: "id_tipo_habilitacao",
  })
  idTipoHabilitacao: number;

  @ManyToOne(() => Habilitacao, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "id_habilitacao",
    referencedColumnName: "idHabilitacao",
  })
  habilitacao: Habilitacao;

  @ManyToOne(() => TipoHabilitacao, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "id_tipo_habilitacao",
    referencedColumnName: "id_tipo_habilitacao",
  })
  tipoHabilitacao: TipoHabilitacao;
}
