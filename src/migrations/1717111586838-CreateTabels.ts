import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTabels1717111586838 implements MigrationInterface {
    name = 'CreateTabels1717111586838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}
