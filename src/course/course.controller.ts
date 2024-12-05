import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CoursesDto } from 'src/modules/course/application/dto/course.dto';
import { CourseService } from 'src/modules/course/application/service/course.service';
import { AuthGuard } from 'src/modules/iam/auth/application/guard/auth.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard)
  @Post('order')
  orderCourses(@Body() courses: CoursesDto) {
    return this.courseService.orderCourses(courses);
  }
}
