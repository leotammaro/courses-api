import { NestApplication } from '@nestjs/core';
import { Test } from '@nestjs/testing';

import {
  mockExpectedCourses,
  mockCoursesSended,
} from './constants/course.constants';
import * as request from 'supertest';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../../../app.module';
import { UserService } from '../../../iam/user/application/service/user.service';

const mockUserProvider = {
  getOneByExternalIdOrFail: jest.fn(),
};

describe('Course module', () => {
  let app: NestApplication;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useValue(mockUserProvider)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('POST - Order [COURSES]', () => {});
  it('should order courses correctly', async () => {
    mockUserProvider.getOneByExternalIdOrFail.mockResolvedValue({
      id: '00000000-0000-0000-0000-000000000000',
    });
    const exceptedResult = mockExpectedCourses;
    const sendedCoursesData = mockCoursesSended;

    return await request(app.getHttpServer())
      .post('/course/order')
      .expect(HttpStatus.CREATED)
      .send(sendedCoursesData)
      .then(({ body }) => {
        expect(body).toEqual(expect.arrayContaining(exceptedResult));
      });
  });

  it('should throw error if user doesnt exists', async () => {
    mockUserProvider.getOneByExternalIdOrFail.mockResolvedValue(null);
    const exceptedResult = 'Forbidden resource';
    const sendedCoursesData = mockCoursesSended;

    return await request(app.getHttpServer())
      .post('/course/order')
      .send(sendedCoursesData)
      .expect(HttpStatus.FORBIDDEN)
      .then(({ body }) => {
        expect(body.message).toEqual(exceptedResult);
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
