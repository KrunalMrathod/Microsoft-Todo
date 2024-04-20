import { MigrationInterface, QueryRunner } from "typeorm";

export class UserIdTodos1713345888137 implements MigrationInterface {
    name = 'UserIdTodos1713345888137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "userId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "userId"`);
    }

}
