import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../../application/dto/user.dto';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: UserDto) {
    return this.userRepository.save(user);
  }

  async findByExternalId(externalId: string): Promise<User> {
    return this.userRepository.findOne({
      where: { externalId },
    });
  }

  async findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }
}

export interface IUserRepository {
  create(user: UserDto): Promise<User>;
  findByExternalId(externalId: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
