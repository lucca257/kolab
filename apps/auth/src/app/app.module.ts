import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {DatabaseModule} from "@kolab/database";
import {AuthModule} from "./auth/auth.module";
import cookieParser from "cookie-parser";

@Module({
  imports: [
    DatabaseModule,
    AuthModule
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
