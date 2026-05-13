import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class UserLogin1763608015737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_login",
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
            name: "ip_hash",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "finger_print",
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
            default: "now() + interval '10 hours'",
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
      "user_login",
      new TableForeignKey({
        name: "login_user",
        columnNames: ["id_user"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("login_user");
  }
}
