import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableCheck } from "typeorm";

export class CreateHabilitacao1778599849979 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "habilitacao",
        columns: [
          {
            name: "id_habilitacao",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "id_user",
            type: "integer",
            isNullable: false,
          },
          {
            name: "cnes",
            type: "varchar",
            length: "7",
            isNullable: false,
          },
          {
            name: "numero_saips",
            type: "varchar",
            length: "10",
            isNullable: false,
          },
          {
            name: "numero_unico_protocolo",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "tipo_financiamento",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "situacao",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "portaria_habilitacao",
            type: "varchar",
            length: "300",
            isNullable: true,
          },
          {
            name: "num_aceleradores_cobaltos",
            type: "smallint",
            isNullable: true,
          },
          {
            name: "inicio_saips",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "entrada_decan",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "envio_drac",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "parcela_unica",
            type: "numeric",
            precision: 15,
            scale: 2,
            isNullable: true,
          },
          {
            name: "inpacto_mensal",
            type: "numeric",
            precision: 15,
            scale: 2,
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "user_login",
      new TableForeignKey({
        name: "habilitacao",
        columnNames: ["id_user"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKeys("habilitacao", [
      new TableForeignKey({
        name: "fk_habilitacao_estabelecimento",
        columnNames: ["cnes"],
        referencedTableName: "estabelecimento",
        referencedColumnNames: ["cnes"],
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      }),
    ]);

    await queryRunner.createCheckConstraint(
      "habilitacao",
      new TableCheck({
        name: "check_inpacto_mensal",
        expression: `"inpacto_mensal" IS NULL OR "inpacto_mensal" > 0`,
      }),
    );

    await queryRunner.createCheckConstraint(
      "habilitacao",
      new TableCheck({
        name: "check_parcela_unica",
        expression: `"parcela_unica" IS NULL OR "parcela_unica" > 0`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("habilitacao");
  }
}
