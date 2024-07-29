import { Module } from '@nestjs/common';

import {UserModule} from "./user/user.module";
import {DatabaseModule} from "@kolab/database";

@Module({
  imports: [
    DatabaseModule,
    UserModule
  ],
})
export class AppModule {}
