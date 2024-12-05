import { NestApplication } from '@nestjs/core';
import { Test } from '@nestjs/testing';

import * as request from 'supertest';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../../../../app.module';
import { UserService } from '../../../user/application/service/user.service';
import { mockAuthDto, mockExpectedUser } from './constants/auth.constants';
import { EXTERNAL_AUTH_SERVICE } from '../../application/service/firebase.service';

const mockUserProvider = {
  getOneByExternalIdOrFail: jest.fn(),
  create: jest.fn(),
};

const mockExternalAuthProvider = {
  signIn: jest.fn(),
  signUp: jest.fn(),
};

describe('Course module', () => {
  let app: NestApplication;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useValue(mockUserProvider)
      .overrideProvider(EXTERNAL_AUTH_SERVICE)
      .useValue(mockExternalAuthProvider)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('POST - Auth', () => {});
  it('should sign-up user correctly', async () => {
    mockUserProvider.create.mockResolvedValue({
      id: '00000000-0000-0000-0000-000000000000',
    });
    mockUserProvider.getOneByExternalIdOrFail.mockResolvedValue({
      id: '00000000-0000-0000-0000-000000000000',
    });
    mockExternalAuthProvider.signUp.mockResolvedValue(mockExpectedUser);
    const sendedUser = mockAuthDto;

    return await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(sendedUser)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual(mockExpectedUser);
      });
  });

  it('should sign-in user correctly', async () => {
    mockUserProvider.getOneByExternalIdOrFail.mockResolvedValue({
      id: '00000000-0000-0000-0000-000000000000',
    });
    mockExternalAuthProvider.signIn.mockResolvedValue(mockExpectedUser);
    const sendedUser = mockAuthDto;

    return await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(sendedUser)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual(mockExpectedUser);
      });
  });

  it('should throw error if user not exists', async () => {
    mockExternalAuthProvider.signIn.mockRejectedValue(
      new Error('User not exists'),
    );
    const sendedUser = mockAuthDto;

    return await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(sendedUser)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR)
      .then(({ body }) => {
        expect(body.message).toEqual('User not exists');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
