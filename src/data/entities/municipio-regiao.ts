import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Municipio } from "./municipio";
import { RegiaoSaude } from "./regiao-saude";

@Entity("municipio_regiao")
export class MunicipioRegiao {
  @PrimaryColumn({
    name: "ibge_municipio",
    type: "char",
    length: 6,
  })
  ibgeMunicipio: string;

  @PrimaryColumn({
    name: "ibge_regiao",
    type: "char",
    length: 5,
  })
  ibgeRegiao: string;

  @ManyToOne(
    () => Municipio,
    municipio => municipio.municipioRegioes,
  )
  @JoinColumn({
    name: "ibge_municipio",
  })
  municipio: Municipio;

  @ManyToOne(
    () => RegiaoSaude,
    regiao => regiao.municipioRegioes,
  )
  @JoinColumn({
    name: "ibge_regiao",
  })
  regiao: RegiaoSaude;
}
