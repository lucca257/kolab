import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from "../dto/create-user.dto";
import {UpdateUserDto} from "../dto/update-user.dto";
import {User} from "@kolab/database";

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

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserWithTree(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();

    const userMap: { [key: string]: User[] } = {};

    for (const user of users) {
      const parentId: number  = user.parentUserId;
      if (!userMap[parentId]) {
        userMap[parentId] = [];
      }
      userMap[parentId].push(user);
    }

    function buildTree(parentId: number | null): User[] {
      return (userMap[parentId] || []).map((user: User) => ({
        ...user,
        children: buildTree(user.id)
      }));
    }

    return buildTree(null);
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.validateParentId(updateUserDto.parentUserId, id)
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  private async validateParentId(parentUserId: number, currentId: number | null = null): Promise<void> {
    if (!parentUserId) {
      return;
    }
    if (parentUserId === currentId) {
      throw new NotFoundException(`Parent User ID same as Current ID`);
    }
    const parentUser: User = await this.findOne(parentUserId)
    if (!parentUser) {
      throw new NotFoundException(`Parent User ID ${parentUserId} invalid`);
    }
  }
}
