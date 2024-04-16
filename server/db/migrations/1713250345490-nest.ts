import { MigrationInterface, QueryRunner } from "typeorm";

export class Nest1713250345490 implements MigrationInterface {
    name = 'Nest1713250345490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "nest" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nest"`);
    }

}
