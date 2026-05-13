import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1778599849978 implements MigrationInterface {
  name = "Db1778599849978";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS postgis`);

    await queryRunner.query(`
      CREATE TABLE uf (
        uf_sigla CHAR(2) PRIMARY KEY,
        nome_uf VARCHAR(60) NOT NULL,
        casos_novos_sus_2026 INTEGER NOT NULL,
        geom geometry(MultiPolygon, 4674) NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE municipio (
        ibge_municipio CHAR(6) PRIMARY KEY,
        nome_municipio VARCHAR(120) NOT NULL,
        uf_sigla CHAR(2) NOT NULL,
        geom geometry(MultiPolygon, 4674) NOT NULL,
        CONSTRAINT fk_municipio_uf
          FOREIGN KEY (uf_sigla)
          REFERENCES uf(uf_sigla)
          ON DELETE RESTRICT
          ON UPDATE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE macrorregiao_saude (
        ibge_macro CHAR(4) PRIMARY KEY,
        nome_macro VARCHAR(150) NOT NULL,
        uf_sigla CHAR(2) NOT NULL,
        casos_novos_sus_2026 INTEGER NOT NULL,
        geom geometry(MultiPolygon, 4674) NOT NULL,
        CONSTRAINT fk_macro_uf
          FOREIGN KEY (uf_sigla)
          REFERENCES uf(uf_sigla)
          ON DELETE RESTRICT
          ON UPDATE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE regiao_saude (
        ibge_regiao CHAR(5) PRIMARY KEY,
        nome_regiao VARCHAR(200) NOT NULL,
        uf_sigla CHAR(2) NOT NULL,
        ibge_macro CHAR(4) NOT NULL,
        geom geometry(MultiPolygon, 4674) NOT NULL,
        CONSTRAINT fk_regiao_macro
          FOREIGN KEY (ibge_macro)
          REFERENCES macrorregiao_saude(ibge_macro)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE municipio_regiao (
        ibge_municipio CHAR(6) NOT NULL,
        ibge_regiao CHAR(5) NOT NULL,
        PRIMARY KEY (ibge_municipio, ibge_regiao),
        CONSTRAINT fk_municipio_regiao_municipio
          FOREIGN KEY (ibge_municipio)
          REFERENCES municipio(ibge_municipio)
          ON DELETE RESTRICT
          ON UPDATE CASCADE,
        CONSTRAINT fk_municipio_regiao_regiao
          FOREIGN KEY (ibge_regiao)
          REFERENCES regiao_saude(ibge_regiao)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE tipo_habilitacao (
        codigo VARCHAR(10) PRIMARY KEY,
        descricao VARCHAR(250) NOT NULL,
        categoria VARCHAR(30) NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE estabelecimento (
        cnes CHAR(7) PRIMARY KEY,
        nome_estabelecimento VARCHAR(300) NOT NULL,
        cnpj CHAR(18) NOT NULL UNIQUE,
        ibge_municipio CHAR(6) NOT NULL,
        natureza_juridica VARCHAR(60) NOT NULL,
        gestao VARCHAR(20) NOT NULL,
        status CHAR(1) NOT NULL,
        latitude NUMERIC NOT NULL,
        longitude NUMERIC NOT NULL,
        geom geometry(MultiPoint, 4674) NOT NULL,
        CONSTRAINT fk_estabelecimento_municipio
          FOREIGN KEY (ibge_municipio)
          REFERENCES municipio(ibge_municipio)
          ON UPDATE CASCADE,
        CONSTRAINT check_status
          CHECK (status IN ('A','D')),
        CONSTRAINT check_cnes
          CHECK (cnes ~ '^\\d{7}$')
      )
    `);

    await queryRunner.query(`
      CREATE TABLE habilitacao (
        id_habilitacao SERIAL PRIMARY KEY,
        cnes CHAR(7) NOT NULL,
        codigo_habilitacao VARCHAR(10) NOT NULL,
        ano_primeira_habilitacao SMALLINT NOT NULL,
        portaria_sas VARCHAR(300),
        portaria_gm_recurso VARCHAR(300),
        portaria_gm_recurso_ii VARCHAR(300),
        valor_repasse NUMERIC(15,2),
        num_aceleradores_cobaltos SMALLINT,
        habilitacao_em_conjunto VARCHAR(300),
        CONSTRAINT fk_habilitacao_estabelecimento
          FOREIGN KEY (cnes)
          REFERENCES estabelecimento(cnes)
          ON DELETE RESTRICT
          ON UPDATE CASCADE,
        CONSTRAINT fk_habilitacao_tipo
          FOREIGN KEY (codigo_habilitacao)
          REFERENCES tipo_habilitacao(codigo)
          ON DELETE RESTRICT,
        CONSTRAINT check_valor_repasse
          CHECK (valor_repasse IS NULL OR valor_repasse > 0)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE historico_habilitacao (
        id_historico SERIAL PRIMARY KEY,
        id_habilitacao INTEGER NOT NULL,
        sequencia SMALLINT NOT NULL,
        ano_alteracao SMALLINT NOT NULL,
        codigo_habilitacao_novo VARCHAR(10) NOT NULL,
        CONSTRAINT fk_historico_habilitacao
          FOREIGN KEY (id_habilitacao)
          REFERENCES habilitacao(id_habilitacao),
        CONSTRAINT fk_historico_tipo
          FOREIGN KEY (codigo_habilitacao_novo)
          REFERENCES tipo_habilitacao(codigo)
          ON DELETE RESTRICT
      )
    `);

    await queryRunner.query(`
      CREATE TABLE desabilitacao (
        id_desabilitacao SERIAL PRIMARY KEY,
        cnes CHAR(7) NOT NULL,
        ano_desabilitacao SMALLINT NOT NULL,
        portaria_desabilitacao VARCHAR(300),
        numero_sei VARCHAR(80),
        CONSTRAINT fk_desabilitacao_estabelecimento
          FOREIGN KEY (cnes)
          REFERENCES estabelecimento(cnes)
          ON DELETE RESTRICT
      )
    `);

    await queryRunner.query(`
      CREATE TABLE reativacao (
        id_reativacao SERIAL PRIMARY KEY,
        cnes CHAR(7) NOT NULL,
        ano_reativacao SMALLINT NOT NULL,
        portaria_reativacao VARCHAR(300),
        numero_sei VARCHAR(80),
        CONSTRAINT fk_reativacao_estabelecimento
          FOREIGN KEY (cnes)
          REFERENCES estabelecimento(cnes)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS reativacao CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS desabilitacao CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS historico_habilitacao CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS habilitacao CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS estabelecimento CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS tipo_habilitacao CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS municipio_regiao CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS regiao_saude CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS macrorregiao_saude CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS municipio CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS uf CASCADE`);
  }
}
