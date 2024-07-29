import {Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {CreateUserDto, User, UserLibService} from "@kolab/user-lib";
import {HashServiceInterface} from "../hash/hash-service.interface";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserLibService,
    @Inject('HASH_SERVICE')
    private hashService: HashServiceInterface,
    private jwtService: JwtService
  ){}

  async register(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashService.hash(createUserDto.password);
    return await this.userService.create(createUserDto)
  }

  async login(createUserDto: CreateUserDto) {
    const user: User | null = await this.userService.findByUserName(createUserDto.username);

    if (user && await this.hashService.compare(createUserDto.password, user.password)) {
      const payload = { sub: user.id, username: user.username };
      return {
        access_token : this.jwtService.sign(payload)
      };
    }

    throw new UnauthorizedException();
  }

  logout() {

  }
}
