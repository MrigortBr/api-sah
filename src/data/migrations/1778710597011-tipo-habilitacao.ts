import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class UpdateTipoHabilitacaoAndCreateRelation1778710597011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Cria nova tabela com ID
    await queryRunner.createTable(
      new Table({
        name: "tipo_habilitacao",
        columns: [
          {
            name: "id_tipo_habilitacao",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "codigo",
            type: "varchar",
            length: "10",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "descricao",
            type: "varchar",
            length: "250",
            isNullable: false,
          },
          {
            name: "categoria",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
        ],
      }),
    );

    // Tabela de relacionamento
    await queryRunner.createTable(
      new Table({
        name: "habilitacao_tipo_habilitacao",
        columns: [
          {
            name: "id_habilitacao",
            type: "integer",
            isNullable: false,
          },
          {
            name: "id_tipo_habilitacao",
            type: "integer",
            isNullable: false,
          },
        ],
      }),
    );

    // Foreign Keys
    await queryRunner.createForeignKeys("habilitacao_tipo_habilitacao", [
      new TableForeignKey({
        name: "fk_rel_habilitacao",
        columnNames: ["id_habilitacao"],
        referencedTableName: "habilitacao",
        referencedColumnNames: ["id_habilitacao"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),

      new TableForeignKey({
        name: "fk_rel_tipo_habilitacao",
        columnNames: ["id_tipo_habilitacao"],
        referencedTableName: "tipo_habilitacao",
        referencedColumnNames: ["id_tipo_habilitacao"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("habilitacao_tipo_habilitacao");
    await queryRunner.dropTable("tipo_habilitacao");
  }
}
