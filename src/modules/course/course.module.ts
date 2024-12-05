import { Module } from '@nestjs/common';
import { CourseService } from './application/service/course.service';
import { CourseController } from './interface/course.controller';
import { IamModule } from '../iam/iam.module';

@Module({
  imports: [IamModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
