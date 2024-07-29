import {IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  @MinLength(7)
  @MaxLength(30)
  readonly username: string;

  @ApiProperty({ example: 'P@ssWord12' })
  @MinLength(7)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string

  @ApiPropertyOptional({ description: 'parent-user-id' })
  @IsOptional()
  @IsNumber()
  readonly parentUserId: number | null
}
