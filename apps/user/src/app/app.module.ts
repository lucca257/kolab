import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';

import {UserModule} from "./user/user.module";
import {DatabaseModule} from "@kolab/database";
import cookieParser from "cookie-parser";

@Module({
  imports: [
    DatabaseModule,
    UserModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
