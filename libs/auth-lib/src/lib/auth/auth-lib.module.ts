import { Module } from '@nestjs/common';
import {UserLibModule} from "@kolab/user-lib";
import {AuthService} from "./auth.service";
import {BcryptService} from "../hash/bcrypt.service";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {jwtConstants} from "../constants";

@Module({
  imports: [
    UserLibModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
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
