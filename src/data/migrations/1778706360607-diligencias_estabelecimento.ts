import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class DiligenciasHabilitacao1778706360607 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "diligencia_habilitacao",
        columns: [
          {
            name: "id_habilitacao",
            type: "integer",
            isNullable: false,
          },
          {
            name: "id_diligencia",
            type: "integer",
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "diligencia_habilitacao",
      new TableForeignKey({
        name: "diligencia_habilitacao_HFK",
        columnNames: ["id_habilitacao"],
        referencedTableName: "habilitacao",
        referencedColumnNames: ["id_habilitacao"],
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "diligencia_habilitacao",
      new TableForeignKey({
        name: "diligencia_habilitacao_DFK",
        columnNames: ["id_diligencia"],
        referencedTableName: "diligencia",
        referencedColumnNames: ["id"],
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("diligencia_habilitacao");
  }
}
