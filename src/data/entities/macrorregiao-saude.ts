import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { MultiPolygon } from "geojson";
import { Uf } from "./uf";
import { RegiaoSaude } from "./regiao-saude";

@Entity("macrorregiao_saude")
export class MacrorregiaoSaude {
  @PrimaryColumn({
    name: "ibge_macro",
    type: "char",
    length: 4,
  })
  ibgeMacro: string;

  @Column({
    name: "nome_macro",
    type: "varchar",
    length: 150,
  })
  nomeMacro: string;

  @Column({
    name: "uf_sigla",
    type: "char",
    length: 2,
  })
  ufSigla: string;

  @Column({
    name: "casos_novos_sus_2026",
    type: "integer",
  })
  casosNovosSus2026: number;

  @Column({
    type: "geometry",
    spatialFeatureType: "MultiPolygon",
    srid: 4674,
  })
  geom: MultiPolygon;

  @ManyToOne(
    () => Uf,
    uf => uf.macrorregioes,
  )
  @JoinColumn({
    name: "uf_sigla",
  })
  uf: Uf;

  @OneToMany(
    () => RegiaoSaude,
    regiao => regiao.macrorregiao,
  )
  regioes: RegiaoSaude[];
}
