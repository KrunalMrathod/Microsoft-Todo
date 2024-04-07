import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigratiosn1712499554985 implements MigrationInterface {
    name = 'TestMigratiosn1712499554985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "test" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "test2" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "test2"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "test"`);
    }

}
