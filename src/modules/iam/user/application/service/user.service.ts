import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../entity/user.entity';
import { UserDto } from '../dto/user.dto';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../infrastructure/database/user.repository';

export interface IUserService {
  create(createUserDto: UserDto): Promise<User>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserDto: UserDto): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  async getOneByExternalIdOrFail(externalId: string): Promise<User> {
    const user = await this.userRepository.findByExternalId(externalId);
    if (!user) {
      throw new NotFoundException('User doenst exist');
    }

    return user;
  }
}
