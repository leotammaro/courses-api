import { COURSE, CoursesDto, coursesValues } from '../dto/course.dto';

export class CourseService implements ICourseService {
  constructor() {}

  orderCourses(courses: CoursesDto) {
    return courses.courses.sort(
      (a, b) =>
        coursesValues.indexOf(a.desiredCourse as COURSE) -
        coursesValues.indexOf(b.desiredCourse as COURSE),
    );
  }
}

export interface ICourseService {
  orderCourses(courses: CoursesDto);
}
