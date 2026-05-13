import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { MultiPoint } from "geojson";
import { Municipio } from "./municipio";
import { Habilitacao } from "./habilitacao";
import { Desabilitacao } from "./desabilitacao";
import { Reativacao } from "./reativacao";

@Entity("estabelecimento")
export class Estabelecimento {
  @PrimaryColumn({
    type: "char",
    length: 7,
  })
  cnes: string;

  @Column({
    name: "nome_estabelecimento",
    type: "varchar",
    length: 300,
  })
  nomeEstabelecimento: string;

  @Column({
    type: "char",
    length: 18,
    unique: true,
  })
  cnpj: string;

  @Column({
    name: "ibge_municipio",
    type: "char",
    length: 6,
  })
  ibgeMunicipio: string;

  @Column({
    name: "natureza_juridica",
    type: "varchar",
    length: 60,
  })
  naturezaJuridica: string;

  @Column({
    type: "varchar",
    length: 20,
  })
  gestao: string;

  @Column({
    type: "char",
    length: 1,
  })
  status: string;

  @Column({
    type: "numeric",
  })
  latitude: number;

  @Column({
    type: "numeric",
  })
  longitude: number;

  @Column({
    type: "geometry",
    spatialFeatureType: "MultiPoint",
    srid: 4674,
  })
  geom: MultiPoint;

  @ManyToOne(
    () => Municipio,
    municipio => municipio.estabelecimentos,
  )
  @JoinColumn({
    name: "ibge_municipio",
  })
  municipio: Municipio;

  @OneToMany(
    () => Habilitacao,
    habilitacao => habilitacao.estabelecimento,
  )
  habilitacoes: Habilitacao[];

  @OneToMany(
    () => Desabilitacao,
    desabilitacao => desabilitacao.estabelecimento,
  )
  desabilitacoes: Desabilitacao[];

  @OneToMany(
    () => Reativacao,
    reativacao => reativacao.estabelecimento,
  )
  reativacoes: Reativacao[];
}
