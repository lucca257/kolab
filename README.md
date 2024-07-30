# Como rodar o projeto

Esse projeto foi feito usando docker, execute os comandos para preparar o ambiente

```sh
docker-compose up
```
## Como rodar as migrations?

basta executar o script abaixo:

```sh
docker exec -it kolab-node-1 yarn prisma migrate dev
```

# O que foi feito ?

## autenticação
- [x] registrar usuário
- [x] login usuário
- [x] logout usuário
- [x] Autenticação via JWT
- [x] middleware para verificar usuário logado

## usuário
- [x] listar usuário
- [x] listar usuário com hierarquias
- [x] detalhes de usuário
- [x] deletar usuário
- [x] alterar usuário
- [x] Teste unitário do controller de usuários

## infra
- [x] Documentação swagger dos endpoints
- [x] Criar projeto como um workspace NX com libs separadas
- [x] Docker
- [x] Migrations usando Prisma
- [ ] AWS com APIGateway
- [ ] Lambda


# observações

Procurei maximizar o reaproveitamento de lógica e aplicar princípios de inversão de dependência. Um exemplo disso é a utilização do serviço bcrypt, onde criei uma interface para permitir a troca da biblioteca sem dificuldades. Além disso, busquei reutilizar o módulo de banco de dados, dado que o banco é compartilhado, e aproveitei as bibliotecas existentes usando os módulos do Nx com NestJS.

# O que faria de melhor

- No endpoint para listar usuários em formato de árvore, restrinja a visualização da árvore com base no nível do nó. Por exemplo, um usuário no nível 3 não deve ter acesso a informações do nível 2 e assim por diante.
- Implementar o uso de Redis ou um banco de dados para controle e expiração de tokens, incluindo a criação de uma lista negra de tokens.
- Refatorar os testes unitários do controlador de usuários para testes end-to-end (e2e) e também criar testes unitários para autenticação (auth).
