import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserService} from "./service/user.service";
import {UserController} from "./controller/user.controller";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {User} from "../../../../../libs/user/src";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
