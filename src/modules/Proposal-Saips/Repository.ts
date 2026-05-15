import { DataSource, In } from "typeorm";
import { AppDataSource } from "../../data/data-source";
import { Diligencia } from "../../data/entities/Diligencia";
import { Estabelecimento } from "../../data/entities/estabelecimento";
import { TipoHabilitacao } from "../../data/entities/tipo-habilitacao";
import { User } from "../../data/entities/User";
import { BODY_EXPECTED } from "./type";
import { Habilitacao } from "../../data/entities/habilitacao";
import { HabilitacaoTipoHabilitacao } from "../../data/entities/habilitacaoTipoHabilitacao";
import { DiligenciaHabilitacao } from "../../data/entities/DiligenciaHabilitacao";
import { HistoricoHabilitacao } from "../../data/entities/historico-habilitacao";

export default class ProposalRepository {
  private tipoHabilitacaoRepo = AppDataSource.getRepository(TipoHabilitacao);
  private diligenciaRepo = AppDataSource.getRepository(Diligencia);
  private userRepo = AppDataSource.getRepository(User);
  private estabelecimentoRepo = AppDataSource.getRepository(Estabelecimento);

  async getTipoHabilitacao(): Promise<TipoHabilitacao[]> {
    try {
      return await this.tipoHabilitacaoRepo.find();
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async getDiligencia(): Promise<Diligencia[]> {
    try {
      return await this.diligenciaRepo.find();
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async getTechnicians(): Promise<Partial<User>[]> {
    try {
      return await this.userRepo.find({ where: { permission: { id: 2 } }, select: { name: true, surname: true, id: true } });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async getCnesList(): Promise<Partial<Estabelecimento>[]> {
    try {
      return await this.estabelecimentoRepo.find({ select: { cnes: true, nomeEstabelecimento: true } });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async insertNewForm(body: BODY_EXPECTED) {
    try {
      await AppDataSource.transaction(async manager => {
        const tiposHabilitacao = await manager.find(TipoHabilitacao, {
          where: {
            codigo: In(body.tipohabilitacao),
          },
        });

        const diligencias = await manager.find(Diligencia, {
          where: {
            title: In(body.diligencia),
          },
        });

        if (tiposHabilitacao.length !== body.tipohabilitacao.length) {
          throw new Error("PS-BI");
        }

        if (diligencias.length !== body.diligencia.length) {
          throw new Error("PS-BI");
        }

        const habilitacao = await manager.create(Habilitacao, {
          cnes: body.cnes,

          numeroSaips: body.saips,

          numeroUnicoProtocolo: body.nup,

          tipoFinanciamento: body.tipo_financiamento,

          situacao: body.situacao,

          user: { id: body.tecnico_responsavel_id },

          portariaHabilitacao: body.numero_portaria,

          numAceleradoresCobaltos: body.numero_aceleradores,

          inicioSaips: new Date(body.inicio_saips),

          entradaDecan: new Date(body.entrada_decan),

          envioDrac: new Date(body.envio_drac),

          inpactoMensal: body.inpacto_mensal,

          parcelaUnica: body.parcela_unica,
        });

        const idHabilitaçao = (await manager.save(Habilitacao, habilitacao)).idHabilitacao;

        await manager.save(
          HabilitacaoTipoHabilitacao,
          tiposHabilitacao.map(tipo => ({
            idHabilitacao: idHabilitaçao,
            idTipoHabilitacao: tipo.id_tipo_habilitacao,
          })),
        );

        await manager.save(
          DiligenciaHabilitacao,
          diligencias.map(d => ({
            idHabilitacao: idHabilitaçao,
            idDiligencia: d.id,
          })),
        );

        if (body.hitorico != undefined) {
          const historicos = body.hitorico.map(h =>
            manager.create(HistoricoHabilitacao, {
              sequencia: h.sequencia,
              idHabilitacao: idHabilitaçao,
              anoAlteracao: Number(h.anoAlteracao),
              codigos: h.codigos,
            }),
          );

          await manager.save(HistoricoHabilitacao, historicos);
        }
      });
    } catch (error) {
      if (error instanceof Error && (error.name === "EntityNotFoundError" || error.message === "PS-BI")) {
        throw error;
      }

      if (process.env.LOGGING_ERRORS == "1") {
        console.log(error);
      }

      throw new Error("US-UK");
    }
  }

  async updateForm(idHabilitacao: number, body: BODY_EXPECTED) {
    try {
      await AppDataSource.transaction(async manager => {
        const habilitacao = await manager.findOne(Habilitacao, {
          where: {
            idHabilitacao,
          },
        });

        if (!habilitacao) {
          throw new Error("PS-BI");
        }

        const tiposHabilitacao = await manager.find(TipoHabilitacao, {
          where: {
            codigo: In(body.tipohabilitacao),
          },
        });

        const diligencias = await manager.find(Diligencia, {
          where: {
            title: In(body.diligencia),
          },
        });

        if (tiposHabilitacao.length !== body.tipohabilitacao.length) {
          throw new Error("PS-BI");
        }

        if (diligencias.length !== body.diligencia.length) {
          throw new Error("PS-BI");
        }

        await manager.update(Habilitacao, idHabilitacao, {
          cnes: body.cnes,

          numeroSaips: body.saips,

          numeroUnicoProtocolo: body.nup,

          tipoFinanciamento: body.tipo_financiamento,

          situacao: body.situacao,

          user: { id: body.tecnico_responsavel_id },

          portariaHabilitacao: body.numero_portaria,

          numAceleradoresCobaltos: body.numero_aceleradores,

          inicioSaips: new Date(body.inicio_saips),

          entradaDecan: new Date(body.entrada_decan),

          envioDrac: new Date(body.envio_drac),

          inpactoMensal: body.inpacto_mensal,

          parcelaUnica: body.parcela_unica,
        });

        await manager.delete(HabilitacaoTipoHabilitacao, {
          idHabilitacao,
        });

        await manager.save(
          HabilitacaoTipoHabilitacao,
          tiposHabilitacao.map(tipo => ({
            idHabilitacao,
            idTipoHabilitacao: tipo.id_tipo_habilitacao,
          })),
        );

        await manager.delete(DiligenciaHabilitacao, {
          idHabilitacao,
        });

        await manager.save(
          DiligenciaHabilitacao,
          diligencias.map(d => ({
            idHabilitacao,
            idDiligencia: d.id,
          })),
        );

        await manager.delete(HistoricoHabilitacao, {
          idHabilitacao,
        });

        if (body.hitorico != undefined) {
          const historicos = body.hitorico.map(h =>
            manager.create(HistoricoHabilitacao, {
              sequencia: h.sequencia,

              idHabilitacao,

              anoAlteracao: Number(h.anoAlteracao),

              codigos: h.codigos,
            }),
          );

          await manager.save(HistoricoHabilitacao, historicos);
        }
      });
    } catch (error) {
      if (error instanceof Error && (error.name === "EntityNotFoundError" || error.message === "PS-BI")) {
        throw error;
      }

      if (process.env.LOGGING_ERRORS == "1") {
        console.log(error);
      }

      throw new Error("US-UK");
    }
  }

  async getFormById(idHabilitacao: number) {
    try {
      const result = await AppDataSource.getRepository(Habilitacao)
        .createQueryBuilder("h")

        .leftJoinAndSelect(HabilitacaoTipoHabilitacao, "hth", "hth.id_habilitacao = h.id_habilitacao")

        .leftJoinAndSelect(TipoHabilitacao, "th", "th.id_tipo_habilitacao = hth.id_tipo_habilitacao")

        .leftJoinAndSelect(DiligenciaHabilitacao, "dh", "dh.id_habilitacao = h.id_habilitacao")

        .leftJoinAndSelect(Diligencia, "d", "d.id = dh.id_diligencia")

        .leftJoinAndSelect(User, "u", "u.id = h.id_user")

        .leftJoinAndSelect(HistoricoHabilitacao, "hist", "hist.id_habilitacao = h.id_habilitacao")

        .where("h.id_habilitacao = :id", {
          id: idHabilitacao,
        })

        .getRawMany();

      if (!result.length) {
        throw new Error("PS-BI");
      }

      const first = result[0];

      return {
        id_habilitacao: first.h_id_habilitacao,

        cnes: first.h_cnes,

        saips: first.h_numero_saips,

        nup: first.h_numero_unico_protocolo,

        tipo_financiamento: first.h_tipo_financiamento,

        tecnico: { id: first.u_id, name: first.u_name, surname: first.u_surname },

        situacao: first.h_situacao,

        numero_portaria: first.h_portaria_habilitacao,

        numero_aceleradores: first.h_num_aceleradores_cobaltos,

        inicio_saips: first.h_inicio_saips,

        entrada_decan: first.h_entrada_decan,

        envio_drac: first.h_envio_drac,

        inpacto_mensal: first.h_inpacto_mensal,

        parcela_unica: first.h_parcela_unica,

        tipohabilitacao: Array.from(
          new Map(
            result
              .filter(r => r.th_id_tipo_habilitacao)
              .map(r => [
                r.th_id_tipo_habilitacao,
                {
                  id: r.th_id_tipo_habilitacao,
                  codigo: r.th_codigo,
                  descricao: r.th_descricao,
                  categoria: r.th_categoria,
                },
              ]),
          ).values(),
        ),

        diligencia: Array.from(
          new Map(
            result
              .filter(r => r.d_id)
              .map(r => [
                r.d_id,
                {
                  id: r.d_id,
                  title: r.d_title,
                },
              ]),
          ).values(),
        ),

        historico: Array.from(
          new Map(
            result
              .filter(r => r.hist_id_historico)
              .map(r => [
                r.hist_id_historico,
                {
                  id: r.hist_id_historico,
                  sequencia: r.hist_sequencia,
                  anoAlteracao: r.hist_ano_alteracao,
                  codigos: r.hist_codigos,
                },
              ]),
          ).values(),
        ),
      };
    } catch (error) {
      if (error instanceof Error && error.message === "PS-BI") {
        throw new Error("PS-BI");
      }

      if (process.env.LOGGING_ERRORS == "1") {
        console.log(error);
      }

      throw new Error("US-UK");
    }
  }

  async listSimpleForms() {
    try {
      const repository = AppDataSource.getRepository(Habilitacao);

      const habilitacoes = await repository.find({
        relations: {
          estabelecimento: { municipio: true },

          user: true,
        },
        order: {
          idHabilitacao: "DESC",
        },
      });

      const tiposRepository = AppDataSource.getRepository(HabilitacaoTipoHabilitacao);

      const tipos = await tiposRepository.find({
        relations: {
          tipoHabilitacao: true,
        },
      });

      return habilitacoes.map(h => {
        const tiposRelacionados = tipos
          .filter(t => t.idHabilitacao === h.idHabilitacao)
          .map(t => ({
            id: t.tipoHabilitacao.id_tipo_habilitacao,
            codigo: t.tipoHabilitacao.codigo,
            descricao: t.tipoHabilitacao.descricao,
            categoria: t.tipoHabilitacao.categoria,
          }));

        return {
          id_habilitacao: h.idHabilitacao,

          nome_estabelecimento: h.estabelecimento?.nomeEstabelecimento,

          cnes_estabelecimento: h.estabelecimento?.cnes,

          uf_estabelecimento: h.estabelecimento.municipio.ufSigla,

          tecnico: h.user ? `${h.user.name} ${h.user.surname}` : null,

          situacao: h.situacao,

          tipohabilitacao: tiposRelacionados,

          inicio_saips: h.inicioSaips,
        };
      });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") {
        console.log(error);
      }

      throw new Error("US-UK");
    }
  }
}
