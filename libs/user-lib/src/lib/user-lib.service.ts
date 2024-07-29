import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {User} from "./user.entity";

@Injectable()
export class UserLibService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.validateUsername(createUserDto.username);
    await this.validateParentId(createUserDto.parentUserId);
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserWithTree(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();

    const userMap: { [key: string]: User[] } = {};

    for (const user of users) {
      // @ts-ignore
      const parentId: number  = user.parentUserId;
      if (!userMap[parentId]) {
        userMap[parentId] = [];
      }
      userMap[parentId].push(user);
    }

    function buildTree(parentId: number | null): User[] {
      // @ts-ignore
      return (userMap[parentId] || []).map((user: User) => ({
        ...user,
        children: buildTree(user.id)
      }));
    }

    return buildTree(null);
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id: id });
  }

  findByUserName(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username: username });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User| null> {
    await this.validateParentId(updateUserDto.parentUserId, id)
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  private async validateParentId(parentUserId: number | null = null, currentId: number | null = null): Promise<void> {
    if (!parentUserId) {
      return;
    }
    if (parentUserId === currentId) {
      throw new NotFoundException(`Parent User ID same as Current ID`);
    }
    const parentUser: User | null = await this.findOne(parentUserId)
    if (!parentUser) {
      throw new NotFoundException(`Parent User ID ${parentUserId} invalid`);
    }
  }

  private async validateUsername(username: string) {
    const user = await this.userRepository.findOneBy({
      username: username
    });
    if (user) {
      throw new NotFoundException(`Username not valid`);
    }
  }
}
