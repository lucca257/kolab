import { Module } from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "@kolab/auth-lib";
import {UserLibModule} from "@kolab/user-lib";

@Module({
  imports: [UserLibModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
