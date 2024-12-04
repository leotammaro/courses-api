import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { Repository } from 'typeorm';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User) {
    return this.userRepository.save(user);
  }

  async findByExternalId(externalId: string) {
    return this.userRepository.findOneBy({ externalId });
  }

  async findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }
}
