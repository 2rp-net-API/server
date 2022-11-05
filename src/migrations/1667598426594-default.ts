import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667598426594 implements MigrationInterface {
    name = 'default1667598426594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hora-extra" ("idhoraextra" SERIAL NOT NULL, "entrada" character varying NOT NULL, "saida" character varying NOT NULL, "isApproved" boolean NOT NULL DEFAULT false, "description" character varying NOT NULL, "idcolaborador" integer, CONSTRAINT "PK_3c9590fa7ef3bcf80213957fc94" PRIMARY KEY ("idhoraextra"))`);
        await queryRunner.query(`CREATE TABLE "sobreaviso" ("idsobreaviso" SERIAL NOT NULL, "entrada" character varying NOT NULL, "saida" character varying NOT NULL, "isApproved" boolean NOT NULL, "description" character varying NOT NULL, "idcolaborador" integer, CONSTRAINT "PK_db6883d7c8674456678641c5e3c" PRIMARY KEY ("idsobreaviso"))`);
        await queryRunner.query(`CREATE TYPE "public"."colaboradores_status_enum" AS ENUM('ativo', 'inativo')`);
        await queryRunner.query(`ALTER TABLE "colaboradores" ADD "status" "public"."colaboradores_status_enum" NOT NULL DEFAULT 'ativo'`);
        await queryRunner.query(`ALTER TABLE "hora-extra" ADD CONSTRAINT "fk_colaborador_id" FOREIGN KEY ("idcolaborador") REFERENCES "colaboradores"("idcolaborador") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sobreaviso" ADD CONSTRAINT "fk_colaborador_id" FOREIGN KEY ("idcolaborador") REFERENCES "colaboradores"("idcolaborador") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sobreaviso" DROP CONSTRAINT "fk_colaborador_id"`);
        await queryRunner.query(`ALTER TABLE "hora-extra" DROP CONSTRAINT "fk_colaborador_id"`);
        await queryRunner.query(`ALTER TABLE "colaboradores" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."colaboradores_status_enum"`);
        await queryRunner.query(`DROP TABLE "sobreaviso"`);
        await queryRunner.query(`DROP TABLE "hora-extra"`);
    }

}
