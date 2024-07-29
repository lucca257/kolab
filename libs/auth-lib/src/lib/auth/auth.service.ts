import {Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {CreateUserDto, User, UserLibService} from "@kolab/user-lib";
import {HashServiceInterface} from "../hash/hash-service.interface";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserLibService,
    @Inject('HASH_SERVICE')
    private hashService: HashServiceInterface,
  ){}

  async register(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashService.hash(createUserDto.password);
    return await this.userService.create(createUserDto)
  }

  async login(createUserDto: CreateUserDto) {
    const user: User | null = await this.userService.findByUserName(createUserDto.username);

    if (user && await this.hashService.compare(createUserDto.password, user.password)) {
      //return jwt
    }

    throw new UnauthorizedException();
  }

  logout() {

  }
}
