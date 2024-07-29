import {Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthLoginDto} from "./dto/auth-login.dto";
import {CreateUserDto, User, UserLibService} from "@kolab/user-lib";
import {HashServiceInterface} from "../hash/hash-service.interface";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserLibService,
    @Inject('HASH_SERVICE')
    private hashService: HashServiceInterface
  ){}

  async register(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashService.hash(createUserDto.password);
    return await this.userService.create(createUserDto)
  }

  login(authLoginDto: AuthLoginDto) {
    const { username, password } = authLoginDto;
    //search user by name
    //bcrypt the password on database and the user passed
    //usar o servico de jwt/helper e salvar
    //se sucesso retornar a chave de acesso
    throw new UnauthorizedException();
  }

  logout() {

  }
}
