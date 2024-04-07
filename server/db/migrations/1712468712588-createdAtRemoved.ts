import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedAtRemoved1712468712588 implements MigrationInterface {
    name = 'CreatedAtRemoved1712468712588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
