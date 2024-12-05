import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

enum ENVIRONMENT {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

const production: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
};

const development: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
};

export const datasourceOptions: DataSourceOptions = (() => {
  if (process.env.NODE_ENV == ENVIRONMENT.PRODUCTION) {
    return production;
  }

  if (process.env.NODE_ENV == ENVIRONMENT.DEVELOPMENT) {
    return development;
  }

  throw new Error('No environment defined');
})();
export default new DataSource({
  ...datasourceOptions,
  entities: ['./src/**/entity/*.entity.{ts,js}'],
  migrations: ['./data/migrations/*.ts'],
});
