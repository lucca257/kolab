import { Test, TestingModule } from '@nestjs/testing';
import {UserController} from "./user.controller";
import {UserService} from "../service/user.service";
import {Repository} from "typeorm";

import {User} from "@kolab/database";
import {getRepositoryToken} from "@nestjs/typeorm";
import {CreateUserDto} from "../dto/create-user.dto";
import {NotFoundException} from "@nestjs/common";
import {UpdateUserDto} from "../dto/update-user.dto";

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('list user', () => {
    it('should all list users', async () => {
      const user = {
        id: 1,
        username: 'username',
        password: 'password',
        parentUserId: null,
      } as User;

      const users: User[] = [user];
      jest.spyOn(repository, 'find').mockResolvedValue(users);

      expect(await controller.findAll()).toBe(users);
      expect(repository.find).toHaveBeenCalled();
    });

    it('should list users with parent', async () => {
      const user: User = {
        id: 1,
        username: 'username',
        password: 'password',
        parentUserId: null,
        children: []
      } as User;

      const child: User = {
        id: 2,
        username: 'username',
        password: 'password',
        parentUserId: 1,
        children: []
      } as User;

      const users: User[] = [user, child];
      jest.spyOn(repository, 'find').mockResolvedValue(users);

      user.children = [child];
      const expectedUsers = [
        {
          ...user,
          children: [
            {
              ...child,
              children: []
            }
          ]
        }
      ];

      expect(await controller.getUserTree()).toEqual(expectedUsers);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  it('should return user details', async () => {
    const user: User = {
      id: 1,
      username: 'username',
      password: 'password',
      parentUserId: null
    } as User;

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

    expect(await controller.findOne(`${user.id}`)).toBe(user);
    expect(repository.findOneBy).toHaveBeenCalled();
  });

  describe('create user', () => {
    it('should have a valid parentUserId', async () => {
      try {
        const createUserDto: CreateUserDto = {
          username: 'username',
          password: 'password',
          parentUserId: 1,
        };
        const newUser: User = {
          id: 1,
          ...createUserDto,
        } as User;

        jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
        jest.spyOn(repository, 'save').mockResolvedValue(newUser);

        await controller.create(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should create and return user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'username',
        password: 'password',
        parentUserId: null,
      };
      const newUser: User = {
        id: 1,
        ...createUserDto,
      } as User;

      jest.spyOn(repository, 'save').mockResolvedValue(newUser);
      const result = await controller.create(createUserDto);
      expect(result).toEqual(newUser);
    });
  });

  describe('update user', () => {
    it('should have a valid parentUserId', async () => {
      try {
        const updateUserDto: UpdateUserDto = {
          username: 'username',
          password: 'password',
          parentUserId: null,
        };

        const updatedUser: User = {
          id: 2,
          username: 'username',
          password: 'password',
          parentUserId: 2,
        } as User;

        jest.spyOn(repository, 'findOneBy').mockResolvedValue(updatedUser);
        jest.spyOn(repository, 'update').mockResolvedValue(null);

        await controller.update(`${updatedUser.id}`, updateUserDto);
        expect(repository.update).toHaveBeenCalledWith(updatedUser.id, updateUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should update and return user', async () => {
      const updateUserDto: UpdateUserDto = {
        username: 'username',
        password: 'password',
        parentUserId: null,
      };

      const updatedUser: User = {
        id: 2,
        username: 'username',
        password: 'password',
        parentUserId: null,
      } as User;

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(updatedUser);
      jest.spyOn(repository, 'update').mockResolvedValue(null);

      expect(await controller.update( `${updatedUser.id}`, updateUserDto)).toEqual(updatedUser);
      expect(repository.update).toHaveBeenCalledWith(updatedUser.id, updateUserDto);
    });
  });

  describe('delete user', () => {
    it('should delete user', async () => {
      const user: User = {
        id: 1,
        username: 'username',
        password: 'password',
        parentUserId: null,
      } as User;

      jest.spyOn(repository, 'delete').mockResolvedValue(null);

      await controller.remove(`${user.id}`);
      expect(repository.delete).toHaveBeenCalledWith(user.id);
    });
  });
});
