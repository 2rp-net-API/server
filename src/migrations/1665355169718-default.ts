import { MigrationInterface, QueryRunner } from "typeorm";

export class default1665355169718 implements MigrationInterface {
    name = 'default1665355169718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "funcionario" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "matricula" character varying NOT NULL, "position" character varying NOT NULL, "password" character varying NOT NULL, "description" character varying NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "UQ_f868493b618f6780e84ea266e5e" UNIQUE ("email"), CONSTRAINT "UQ_7fc3be9847b38a8211cfee3844d" UNIQUE ("matricula"), CONSTRAINT "PK_2c5d0c275b4f652fd5cb381655f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hora-extra" ("id" SERIAL NOT NULL, "entrada" character varying NOT NULL, "saida" character varying NOT NULL, "isApproved" boolean NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_ab04732171acfa5f99d5eff6348" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sobreaviso" ("id" SERIAL NOT NULL, "entrada" character varying NOT NULL, "saida" character varying NOT NULL, "isApproved" boolean NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_02bacb96a6549b9bbde543f2242" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sobreaviso"`);
        await queryRunner.query(`DROP TABLE "hora-extra"`);
        await queryRunner.query(`DROP TABLE "funcionario"`);
    }

}
