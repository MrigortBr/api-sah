import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Habilitacao } from "./habilitacao";
import { Diligencia } from "./Diligencia";

@Entity("diligencia_habilitacao")
export class DiligenciaHabilitacao {
  @PrimaryColumn({
    name: "id_habilitacao",
  })
  idHabilitacao: number;

  @PrimaryColumn({
    name: "id_diligencia",
  })
  idDiligencia: number;

  @ManyToOne(() => Habilitacao, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "id_habilitacao",
    referencedColumnName: "idHabilitacao",
  })
  habilitacao: Habilitacao;

  @ManyToOne(() => Diligencia, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "id_diligencia",
    referencedColumnName: "id",
  })
  diligencia: Diligencia;
}
