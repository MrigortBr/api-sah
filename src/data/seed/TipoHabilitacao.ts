import { DataSource } from "typeorm";
import { TipoHabilitacao } from "../entities/tipo-habilitacao";

export async function seedTipoHabilitacao(dataSource: DataSource) {
  const repository = dataSource.getRepository(TipoHabilitacao);

  await repository.save([
    {
      codigo: "17.04",
      categoria: "Não Definido",
      descricao: "Serviço Isolado de Radioterapia",
    },
    {
      codigo: "17.06",
      categoria: "Não Definido",
      descricao: "UNACON",
    },
    {
      codigo: "17.07",
      categoria: "Não Definido",
      descricao: "UNACON com Serviço de Radioterapia",
    },
    {
      codigo: "17.08",
      categoria: "Não Definido",
      descricao: "UNACON com Serviço de Hematologia",
    },
    {
      codigo: "17.09",
      categoria: "Não Definido",
      descricao: "UNACON com Serviço de Oncologia Pediátrica",
    },
    {
      codigo: "17.10",
      categoria: "Não Definido",
      descricao: "UNACON Exclusiva de Hematologia",
    },
    {
      codigo: "17.11",
      categoria: "Não Definido",
      descricao: "UNACON Exclusiva de Oncologia Pediátrica",
    },
    {
      codigo: "17.12",
      categoria: "Não Definido",
      descricao: "CACON",
    },
    {
      codigo: "17.13",
      categoria: "Não Definido",
      descricao: "CACON com Serviço de Oncologia Pediátrica",
    },
    {
      codigo: "17.14",
      categoria: "Não Definido",
      descricao: "Hospital Geral com Cirurgia Oncológica",
    },
    {
      codigo: "17.15",
      categoria: "Não Definido",
      descricao: "Serviço de Radioterapia de Complexo Hospitalar",
    },
  ]);

  console.log("Tipo Habilitações seed criadas");
}
