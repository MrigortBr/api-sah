import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class User1763583714681 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "position",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "surname",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "emailVerified",
            type: "boolean",
            default: false,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "id_permission",
            type: "integer",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
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
      "user",
      new TableForeignKey({
        name: "user_permission",
        columnNames: ["id_permission"],
        referencedTableName: "permission",
        referencedColumnNames: ["id"],
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("user");
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("id_permission") !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey("user", foreignKey);
    }

    await queryRunner.dropTable("user");
  }
}
