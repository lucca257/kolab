import { Module } from '@nestjs/common';
import {UserLibModule} from "@kolab/user-lib";
import {AuthService} from "./auth.service";
import {BcryptService} from "../hash/bcrypt.service";

@Module({
  imports: [UserLibModule],
  providers: [
    AuthService,
    {
      provide: 'HASH_SERVICE',
      useClass: BcryptService,
    }
  ],
  exports: [UserLibModule, AuthService],
})
export class AuthLibModule {}
