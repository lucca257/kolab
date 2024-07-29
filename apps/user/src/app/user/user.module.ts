import { Module } from '@nestjs/common';
import {UserController} from "./controller/user.controller";
import {UserLibModule} from "@kolab/user-lib";

@Module({
  imports: [UserLibModule],
  providers: [UserLibModule],
  controllers: [UserController],
})
export class UserModule {}
