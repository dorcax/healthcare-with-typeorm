import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1747264613236 implements MigrationInterface {
    name = 'Migrations1747264613236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" ALTER COLUMN "code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ALTER COLUMN "subject" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" ALTER COLUMN "subject" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ALTER COLUMN "code" DROP NOT NULL`);
    }

}
