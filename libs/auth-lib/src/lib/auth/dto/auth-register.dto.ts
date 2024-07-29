import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class authRegister {
  @ApiProperty({ example: 'username' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  readonly password: string

  @ApiPropertyOptional({ description: 'parent-user-id' })
  @IsOptional()
  @IsNumber()
  readonly parentUserId: number | null
}
