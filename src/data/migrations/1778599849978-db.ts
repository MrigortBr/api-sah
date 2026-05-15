import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1778599849978 implements MigrationInterface {
  name = "Db1778599849978";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS postgis`);

    await queryRunner.query(`
      CREATE TABLE uf (
        uf_sigla CHAR(2) PRIMARY KEY UNIQUE,
        nome_uf VARCHAR(60) NOT NULL UNIQUE,
        casos_novos_sus_2026 INTEGER NOT NULL,
        geom geometry(MultiPolygon, 4674) NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE municipio (
        ibge_municipio CHAR(6) PRIMARY KEY,
        nome_municipio VARCHAR(120) NOT NULL UNIQUE,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS estabelecimento CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS tipo_habilitacao CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS municipio_regiao CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS regiao_saude CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS macrorregiao_saude CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS municipio CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS uf CASCADE`);
  }
}
