import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class UserReset1763608035999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_reset",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "id_user",
            type: "integer",
            isNullable: false,
          },
          {
            name: "is_avaliable",
            type: "boolean",
            isNullable: false,
            default: true,
          },
          {
            name: "token",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
          {
            name: "expires_at",
            type: "timestamp",
            default: "now() + interval '1 hours'",
            isNullable: false,
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "user_reset",
      new TableForeignKey({
        name: "reset_user",
        columnNames: ["id_user"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_reset");
  }
}
