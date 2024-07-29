import { Module } from '@nestjs/common';
import { AuthController } from "./auth.controller";
import { AuthLibModule } from "@kolab/auth-lib";

@Module({
  imports: [AuthLibModule],
  controllers: [AuthController],
})
export class AuthModule {}
