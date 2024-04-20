import { MigrationInterface, QueryRunner } from "typeorm";

export class TodoDescription1713346957249 implements MigrationInterface {
    name = 'TodoDescription1713346957249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "todo"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "todoTitle" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "todoTitle"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "todo" character varying NOT NULL`);
    }

}
