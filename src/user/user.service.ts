import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
  ) {}

  async findUserByEmail(email: string) {
    let user: User = await this.userRepo.findOne({ where: { email: email } });
    return user;
  }
}
