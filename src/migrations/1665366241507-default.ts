import { MigrationInterface, QueryRunner } from "typeorm";

export class default1665366241507 implements MigrationInterface {
    name = 'default1665366241507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sobreaviso" ADD CONSTRAINT "FK_02bacb96a6549b9bbde543f2242" FOREIGN KEY ("id") REFERENCES "funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sobreaviso" DROP CONSTRAINT "FK_02bacb96a6549b9bbde543f2242"`);
    }

}
