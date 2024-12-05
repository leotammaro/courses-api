import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum COURSE {
  FINANCE = 'Finance',
  INVESTMENT = 'Investment',
  INVESTMENT_MANAGMENT = 'InvestmentManagment',
  PORTFOLIO_THEORIES = 'PortfolioTheories',
  INVESTMENT_STYLE = 'InvestmentStyle',
  PORTFOLIO_CONSTRUCTION = 'PortfolioConstruction',
}

export const coursesValues = Object.values(COURSE);

export class CourseDto {
  @IsEnum(COURSE)
  @IsString()
  desiredCourse: string;
}

export class CoursesDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  courses: CourseDto[];
}
