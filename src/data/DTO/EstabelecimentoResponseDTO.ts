import { Estabelecimento } from "../entities/estabelecimento";

export interface EstabelecimentoResponseDTO {
  cnes: string;
  nomeEstabelecimento: string;
  cnpj: string;

  naturezaJuridica: string;
  gestao: string;
  status: string;

  municipio: {
    ibgeMunicipio: string;
    nomeMunicipio: string;

    uf: {
      ufSigla: string;
      nomeUf: string;

      regioes?: {
        ibgeRegiao: string;
        nomeRegiao: string;
      }[];

      macrorregioes?: {
        ibgeMacro: string;
        nomeMacro: string;
      }[];
    };
  };
}

export function toEstabelecimentoDTO(estabelecimento: Estabelecimento): EstabelecimentoResponseDTO {
  return {
    cnes: estabelecimento.cnes,
    nomeEstabelecimento: estabelecimento.nomeEstabelecimento,
    cnpj: estabelecimento.cnpj.trim(),

    naturezaJuridica: estabelecimento.naturezaJuridica,
    gestao: estabelecimento.gestao,
    status: estabelecimento.status,

    municipio: {
      ibgeMunicipio: estabelecimento.municipio.ibgeMunicipio,
      nomeMunicipio: estabelecimento.municipio.nomeMunicipio,

      uf: {
        ufSigla: estabelecimento.municipio.uf.ufSigla,
        nomeUf: estabelecimento.municipio.uf.nomeUf,

        regioes:
          estabelecimento.municipio.uf.regioes?.map(regiao => ({
            ibgeRegiao: regiao.ibgeRegiao,
            nomeRegiao: regiao.nomeRegiao,
          })) || [],

        macrorregioes:
          estabelecimento.municipio.uf.macrorregioes?.map(macro => ({
            ibgeMacro: macro.ibgeMacro,
            nomeMacro: macro.nomeMacro,
          })) || [],
      },
    },
  };
}
