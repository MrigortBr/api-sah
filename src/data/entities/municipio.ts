import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { MultiPolygon } from "geojson";
import { Uf } from "./uf";
import { MunicipioRegiao } from "./municipio-regiao";
import { Estabelecimento } from "./estabelecimento";

@Entity("municipio")
export class Municipio {
  @PrimaryColumn({
    name: "ibge_municipio",
    type: "char",
    length: 6,
  })
  ibgeMunicipio: string;

  @Column({
    name: "nome_municipio",
    type: "varchar",
    length: 120,
  })
  nomeMunicipio: string;

  @Column({
    name: "uf_sigla",
    type: "char",
    length: 2,
  })
  ufSigla: string;

  @Column({
    type: "geometry",
    spatialFeatureType: "MultiPolygon",
    srid: 4674,
  })
  geom: MultiPolygon;

  @ManyToOne(
    () => Uf,
    uf => uf.municipios,
  )
  @JoinColumn({
    name: "uf_sigla",
  })
  uf: Uf;

  @OneToMany(
    () => MunicipioRegiao,
    mr => mr.municipio,
  )
  municipioRegioes: MunicipioRegiao[];

  @OneToMany(
    () => Estabelecimento,
    est => est.municipio,
  )
  estabelecimentos: Estabelecimento[];
}
