import { Module } from '@nestjs/common';
import {UserLibService} from "./user-lib.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserLibService],
  exports: [UserLibService],
})
export class UserLibModule {}
