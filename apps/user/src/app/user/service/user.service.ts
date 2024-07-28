import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {User} from "../../../../../../libs/user/src";

import {CreateUserDto} from "../dto/create-user.dto";
import {UpdateUserDto} from "../dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.validateParentId(createUserDto.parentUserId)
    return this.userRepository.save(createUserDto);
  }

  private async validateParentId(parentUserId: number) {
    if (!parentUserId) {
      return;
    }
    const parentUser = await this.findOne(parentUserId)
    if (!parentUser) {
      throw new NotFoundException(`Parent User ID ${parentUserId} invalid`);
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findTree() {
    const users = this.findAll();
    return users;
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.validateParentId(updateUserDto.parentUserId)
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
