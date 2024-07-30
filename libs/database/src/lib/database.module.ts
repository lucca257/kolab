import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'docker',
      autoLoadEntities: true,
      synchronize: false, //develop only
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
