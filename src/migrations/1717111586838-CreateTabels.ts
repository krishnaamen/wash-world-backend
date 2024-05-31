import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTabels1717111586838 implements MigrationInterface {
  name = 'CreateTabels1717111586838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
    // Update existing rows to have a default non-null value
    await queryRunner.query(
      `UPDATE "user" SET "phone" = '' WHERE "phone" IS NULL`,
    );
    // Alter the column to be NOT NULL
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "phone" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
  }
}
