import { DataSource } from "typeorm";
import { Diligencia } from "../entities/Diligencia";

export async function seedDiligencias(dataSource: DataSource) {
  const repository = dataSource.getRepository(Diligencia);

  const diligencias = [
    {
      title: "Deliberação CIB",
    },
    {
      title: "Link do Plano de Atenção para o Diagnóstico e o Tratamento do Câncer",
    },
    {
      title: "Relatório de vistoria realizada pela Vigilância Sanitária",
    },
    {
      title: "Relatório do gestor sobre a necessidade dos serviços de saúde",
    },
    {
      title: "Termo de compromisso",
    },
    {
      title: "Cálculo de previsão financeira",
    },
    {
      title: "Declaração do responsável técnico médico",
    },
    {
      title: "Licença de operação emitida pela CNEN",
    },
    {
      title: "Formulário de Classificação e Verificação dos critérios mínimos para habilitação",
    },
    {
      title: "Parecer conclusivo do gestor",
    },
    {
      title: "Licença Sanitária",
    },
  ];

  await repository.save(diligencias);

  console.log("Diligências seed criadas");
}
