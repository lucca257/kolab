import {IsNotEmpty, IsNumber, IsOptional, IsString, Validate} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string

  @IsOptional()
  @IsNumber()
  parentUserId: number
}
