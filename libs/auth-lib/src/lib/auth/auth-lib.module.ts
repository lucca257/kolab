import { Module } from '@nestjs/common';
import {UserLibModule} from "@kolab/user-lib";
import {AuthService} from "./auth.service";
import {BcryptService} from "../hash/bcrypt.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    UserLibModule,
    JwtModule.register({
      global: true,
      secret: '9wdNtrin+EBTafu8m6HcxQtlwzRmN7fnpMQe2qdrCygswEvr6bqLbNwfRJB6xkY/afzPJVdHntj7jEyZCzwccVtw+KyA6VuzLFIou1J3gB3YSRzwXNBqdd1ILe2lPhnhVnpv6okSB7Xs87bGt/vVZi9pdya7/atkZ7kcosTq5Tru/lWuaN/jrxShAiE9R0+Q1AJz5tScFrVvg3oZlSu4QG4SL/1F4CfYNAycqwpN8MXnRL2IeH4+cDhEMKWuHFW8pRYrUz8F0MRjVPRRw7SX1zMmOU8onuFwVhqz1ya7RHAqSu2LQoqYgmMFh9MrMbBPg2umKqBJOLMNWe2wFV1Z6Q==',
      signOptions: { expiresIn: '1h' },
    }),
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
