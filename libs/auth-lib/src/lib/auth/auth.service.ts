import {Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthLoginDto} from "./dto/auth-login.dto";

@Injectable()
export class AuthService {

  async register() {
    //validate
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
