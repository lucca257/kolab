import { Module } from '@nestjs/common';
import {BcryptService} from "@kolab/auth-lib";

@Module({
  providers: [
    {
      provide: 'HASH_SERVICE',
      useClass: BcryptService,
    }
  ],
})
export class HashModule {}
