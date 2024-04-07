import { MigrationInterface, QueryRunner } from "typeorm";

export class TododsMigration1712499430481 implements MigrationInterface {
    name = 'TododsMigration1712499430481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "test" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "test"`);
    }

}
