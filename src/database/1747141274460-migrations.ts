import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1747141274460 implements MigrationInterface {
    name = 'Migrations1747141274460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token" ("id" SERIAL NOT NULL, "code" character varying, "subject" character varying, "expiry" TIMESTAMP NOT NULL, CONSTRAINT "UQ_4cc689510c7555354706bb37d19" UNIQUE ("code"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "token"`);
    }

}
