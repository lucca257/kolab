import {Body, Controller, Post} from "@nestjs/common";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateUserDto, UserLibService} from "@kolab/user-lib";
import {AuthLoginDto, AuthService} from "@kolab/auth-lib";

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
  login(@Body() authLoginDto: AuthLoginDto) {
    return null;
  }

  @Post('logout')
  @ApiOperation({description: 'Logout user'})
  logout() {
    return null;
  }
}
