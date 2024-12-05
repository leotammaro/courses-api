import { Module } from '@nestjs/common';
import { CourseService } from './application/service/course.service';
import { CourseController } from 'src/course/course.controller';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
