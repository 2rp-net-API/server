import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667949772253 implements MigrationInterface {
    name = 'default1667949772253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."clientes_status_enum" AS ENUM('ativo', 'inativo')`);
        await queryRunner.query(`CREATE TABLE "clientes" ("idcliente" SERIAL NOT NULL, "nome" character varying(70) NOT NULL, "cnpj" character varying(18) NOT NULL, "status" "public"."clientes_status_enum" NOT NULL DEFAULT 'ativo', CONSTRAINT "UQ_bd9bd4df1ccf6f9d83a6f4b26cb" UNIQUE ("cnpj"), CONSTRAINT "PK_64f7120af52a190efd70c321737" PRIMARY KEY ("idcliente"))`);
        await queryRunner.query(`CREATE TYPE "public"."projetos_status_enum" AS ENUM('ativo', 'inativo')`);
        await queryRunner.query(`CREATE TABLE "projetos" ("idprojeto" SERIAL NOT NULL, "nome" character varying(70) NOT NULL, "status" "public"."projetos_status_enum" NOT NULL DEFAULT 'ativo', "idcliente" integer, CONSTRAINT "UQ_2865099b05530df293566b6c0b7" UNIQUE ("nome"), CONSTRAINT "PK_be36502e792fab679bdeefcefbf" PRIMARY KEY ("idprojeto"))`);
        await queryRunner.query(`CREATE TYPE "public"."colaboradores_perfil_enum" AS ENUM('colaborador', 'gestor', 'admin', 'inativo')`);
        await queryRunner.query(`CREATE TYPE "public"."colaboradores_status_enum" AS ENUM('ativo', 'inativo')`);
        await queryRunner.query(`CREATE TABLE "colaboradores" ("idcolaborador" SERIAL NOT NULL, "matricula" integer NOT NULL, "nome" character varying(50) NOT NULL, "senha" character varying NOT NULL, "perfil" "public"."colaboradores_perfil_enum" NOT NULL DEFAULT 'colaborador', "status" "public"."colaboradores_status_enum" NOT NULL DEFAULT 'ativo', "idgestor" integer, CONSTRAINT "UQ_043b711e86a0002c24ad3abac79" UNIQUE ("matricula"), CONSTRAINT "PK_2f93c10bbb7e49f9d3f6ac59af6" PRIMARY KEY ("idcolaborador"))`);
        await queryRunner.query(`CREATE TABLE "hora-extra" ("idhoraextra" SERIAL NOT NULL, "entrada" character varying NOT NULL, "saida" character varying NOT NULL, "isApproved" boolean NOT NULL DEFAULT false, "description" character varying NOT NULL, "idcolaborador" integer, CONSTRAINT "PK_3c9590fa7ef3bcf80213957fc94" PRIMARY KEY ("idhoraextra"))`);
        await queryRunner.query(`CREATE TABLE "sobreaviso" ("idsobreaviso" SERIAL NOT NULL, "entrada" character varying NOT NULL, "saida" character varying NOT NULL, "isApproved" boolean NOT NULL, "description" character varying NOT NULL, "idcolaborador" integer, CONSTRAINT "PK_db6883d7c8674456678641c5e3c" PRIMARY KEY ("idsobreaviso"))`);
        await queryRunner.query(`CREATE TABLE "grupos" ("idprojeto" integer NOT NULL, "idcolaborador" integer NOT NULL, CONSTRAINT "PK_9ef97fb09d2113774edcf4b2ea5" PRIMARY KEY ("idprojeto", "idcolaborador"))`);
        await queryRunner.query(`CREATE INDEX "IDX_19151a74ff6e02b93419589a8e" ON "grupos" ("idprojeto") `);
        await queryRunner.query(`CREATE INDEX "IDX_978f13b44883aefdcc1101f046" ON "grupos" ("idcolaborador") `);
        await queryRunner.query(`ALTER TABLE "projetos" ADD CONSTRAINT "fk_cliente_id" FOREIGN KEY ("idcliente") REFERENCES "clientes"("idcliente") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "colaboradores" ADD CONSTRAINT "fk_gestor_id" FOREIGN KEY ("idgestor") REFERENCES "colaboradores"("idcolaborador") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hora-extra" ADD CONSTRAINT "fk_colaborador_id" FOREIGN KEY ("idcolaborador") REFERENCES "colaboradores"("idcolaborador") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sobreaviso" ADD CONSTRAINT "fk_colaborador_id" FOREIGN KEY ("idcolaborador") REFERENCES "colaboradores"("idcolaborador") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "grupos" ADD CONSTRAINT "FK_19151a74ff6e02b93419589a8ed" FOREIGN KEY ("idprojeto") REFERENCES "projetos"("idprojeto") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "grupos" ADD CONSTRAINT "FK_978f13b44883aefdcc1101f0463" FOREIGN KEY ("idcolaborador") REFERENCES "colaboradores"("idcolaborador") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grupos" DROP CONSTRAINT "FK_978f13b44883aefdcc1101f0463"`);
        await queryRunner.query(`ALTER TABLE "grupos" DROP CONSTRAINT "FK_19151a74ff6e02b93419589a8ed"`);
        await queryRunner.query(`ALTER TABLE "sobreaviso" DROP CONSTRAINT "fk_colaborador_id"`);
        await queryRunner.query(`ALTER TABLE "hora-extra" DROP CONSTRAINT "fk_colaborador_id"`);
        await queryRunner.query(`ALTER TABLE "colaboradores" DROP CONSTRAINT "fk_gestor_id"`);
        await queryRunner.query(`ALTER TABLE "projetos" DROP CONSTRAINT "fk_cliente_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_978f13b44883aefdcc1101f046"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_19151a74ff6e02b93419589a8e"`);
        await queryRunner.query(`DROP TABLE "grupos"`);
        await queryRunner.query(`DROP TABLE "sobreaviso"`);
        await queryRunner.query(`DROP TABLE "hora-extra"`);
        await queryRunner.query(`DROP TABLE "colaboradores"`);
        await queryRunner.query(`DROP TYPE "public"."colaboradores_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."colaboradores_perfil_enum"`);
        await queryRunner.query(`DROP TABLE "projetos"`);
        await queryRunner.query(`DROP TYPE "public"."projetos_status_enum"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`DROP TYPE "public"."clientes_status_enum"`);
    }

}
