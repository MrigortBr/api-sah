// uf.ts
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { MultiPolygon } from "geojson";
import { Municipio } from "./municipio";

import { RegiaoSaude } from "./regiao-saude";
import { MacrorregiaoSaude } from "./macrorregiao-saude";

@Entity("uf")
export class Uf {
  @PrimaryColumn({
    name: "uf_sigla",
    type: "char",
    length: 2,
  })
  ufSigla: string;

  @Column({
    name: "nome_uf",
    type: "varchar",
    length: 60,
  })
  nomeUf: string;

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

  @OneToMany(
    () => Municipio,
    municipio => municipio.uf,
  )
  municipios: Municipio[];

  @OneToMany(
    () => MacrorregiaoSaude,
    macro => macro.uf,
  )
  macrorregioes: MacrorregiaoSaude[];

  @OneToMany(
    () => RegiaoSaude,
    regiao => regiao.uf,
  )
  regioes: RegiaoSaude[];
}
