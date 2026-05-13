import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { MultiPolygon } from "geojson";
import { Uf } from "./uf";
import { MunicipioRegiao } from "./municipio-regiao";
import { MacrorregiaoSaude } from "./macrorregiao-saude";

@Entity("regiao_saude")
export class RegiaoSaude {
  @PrimaryColumn({
    name: "ibge_regiao",
    type: "char",
    length: 5,
  })
  ibgeRegiao: string;

  @Column({
    name: "nome_regiao",
    type: "varchar",
    length: 200,
  })
  nomeRegiao: string;

  @Column({
    name: "uf_sigla",
    type: "char",
    length: 2,
  })
  ufSigla: string;

  @Column({
    name: "ibge_macro",
    type: "char",
    length: 4,
  })
  ibgeMacro: string;

  @Column({
    type: "geometry",
    spatialFeatureType: "MultiPolygon",
    srid: 4674,
  })
  geom: MultiPolygon;

  @ManyToOne(
    () => Uf,
    uf => uf.regioes,
  )
  @JoinColumn({
    name: "uf_sigla",
  })
  uf: Uf;

  @ManyToOne(
    () => MacrorregiaoSaude,
    macro => macro.regioes,
  )
  @JoinColumn({
    name: "ibge_macro",
  })
  macrorregiao: MacrorregiaoSaude;

  @OneToMany(
    () => MunicipioRegiao,
    mr => mr.regiao,
  )
  municipioRegioes: MunicipioRegiao[];
}
