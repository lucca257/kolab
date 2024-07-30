import {Body, Controller, Post, Req, Res} from "@nestjs/common";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "@kolab/user-lib";
import { AuthService} from "@kolab/auth-lib";
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ){}

  @Post('register')
  @ApiOperation({description: 'Register user'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({description: 'Login user'})
  async login(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const authResponse = await this.authService.login(createUserDto);

    res.cookie(
      'Authentication',
      authResponse.access_token,
      {
        httpOnly: true,
        maxAge: 3600000, // 1 hr
      }
    );

    res.send(authResponse);
  }

  @Post('logout')
  @ApiOperation({description: 'Logout user'})
  logout() {
    return null;
  }
}
