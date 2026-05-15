import { Diligencia } from "../../data/entities/Diligencia";
import { TipoHabilitacao } from "../../data/entities/tipo-habilitacao";

export type RESPONSE = {
  infos: {
    tipoHabilitacao: TipoHabilitacao[];
    diligencia: Diligencia[];
  };
};

export type BODY_EXPECTED = {
  saips: string;
  nup: string;
  situacao: string;
  tipo_financiamento: string;
  tecnico_responsavel_id: number;
  numero_portaria: string;
  inicio_saips: string | Date;
  entrada_decan: string | Date;
  envio_drac: string | Date;
  inpacto_mensal: number;
  parcela_unica: number;
  cnes: string;
  numero_aceleradores: number;
  tipohabilitacao: string[];
  diligencia: string[];
  hitorico?: { sequencia: string; anoAlteracao: string; codigos: string }[];
};
