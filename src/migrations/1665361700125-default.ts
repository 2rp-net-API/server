import { MigrationInterface, QueryRunner } from "typeorm";

export class default1665361700125 implements MigrationInterface {
    name = 'default1665361700125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hora-extra" ADD "funcionarioId" integer`);
        await queryRunner.query(`ALTER TABLE "hora-extra" ADD CONSTRAINT "FK_06bcc33264245cd1fdcb58cfb52" FOREIGN KEY ("funcionarioId") REFERENCES "funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hora-extra" DROP CONSTRAINT "FK_06bcc33264245cd1fdcb58cfb52"`);
        await queryRunner.query(`ALTER TABLE "hora-extra" DROP COLUMN "funcionarioId"`);
    }

}
