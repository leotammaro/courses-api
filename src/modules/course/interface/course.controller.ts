import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CoursesDto } from '../application/dto/course.dto';
import { CourseService } from '../application/service/course.service';
import { AuthGuard } from '../../iam//auth/application/guard/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Order [COURSES]' })
  @Post('order')
  orderCourses(@Body() courses: CoursesDto) {
    return this.courseService.orderCourses(courses);
  }
}
