import { Module } from '@nestjs/common';
import {DatabaseModule} from "@kolab/database";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
