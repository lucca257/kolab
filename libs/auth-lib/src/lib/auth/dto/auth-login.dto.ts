import {IsNotEmpty, IsString, Matches, MaxLength, MinLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AuthLoginDto {
  @ApiProperty({ example: 'username' })
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(30)
  readonly username: string;

  @ApiProperty({ example: 'P@ssWord12' })
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  readonly password: string
}
