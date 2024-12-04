import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1733338841882 implements MigrationInterface {
  name = 'UserTable1733338841882';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`externalId\` varchar(255) NOT NULL, \`isVerified\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
