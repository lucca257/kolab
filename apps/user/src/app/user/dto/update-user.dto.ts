import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ description: 'username' })
  username?: string;

  @ApiPropertyOptional({ description: 'password' })
  password?: string;

  @ApiPropertyOptional({ description: 'parent-user-id' })
  parentUserId?: number | null;
}
