import { Module } from '@nestjs/common';
import {UserController} from "./controller/user.controller";
import {UserLibModule} from "@kolab/user-lib";
import {JwtStrategy} from "@kolab/auth-lib";

@Module({
  imports: [UserLibModule],
  providers: [UserLibModule, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
