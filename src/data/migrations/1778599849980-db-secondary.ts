import { MigrationInterface, QueryRunner } from "typeorm";

export class dbSeconday1778599849980 implements MigrationInterface {
  name = "DiligenciasEstabelecimento1778711050380";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE historico_habilitacao (
        id_historico SERIAL PRIMARY KEY,
        id_habilitacao INTEGER NOT NULL,
        sequencia VARCHAR(300) NOT NULL,
        ano_alteracao SMALLINT NOT NULL,
        codigos VARCHAR(300) NOT NULL,
        CONSTRAINT fk_historico_habilitacao
          FOREIGN KEY (id_habilitacao)
          REFERENCES habilitacao(id_habilitacao)
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
  }
}
