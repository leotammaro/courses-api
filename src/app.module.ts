import { Module } from '@nestjs/common';
import { IamModule } from './modules/iam/iam.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { datasourceOptions } from './orm.configuration';
import { CourseModule } from './modules/course/course.module';
import { User } from './modules/iam/user/entity/user.entity';

@Module({
  imports: [
    IamModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...datasourceOptions,
        entities: [User],
      }),
      dataSourceFactory: async (options) => {
        return new DataSource(options).initialize();
      },
    }),
    CourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
