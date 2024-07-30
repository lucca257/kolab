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

autenticação
- [x] registrar usuário
- [x] login usuário
- [x] logout usuário
- [x] Autenticação via JWT
- [x] middleware para verificar usuário logado

usuário
- [x] listar usuário
- [x] listar usuário com hierarquias
- [x] detalhes de usuário
- [x] deletar usuário
- [x] alterar usuário
- [x] Teste unitário do controller de usuários

infra
- [x] Documentação swagger dos endpoints
- [x] Criar projeto como um workspace NX com libs separadas
- [x] Docker
- [x] Migrations usando Prisma
- [ ] AWS com APIGateway
- [ ] Lambda


# observações

Tentei ao máximo reaproveitar a lógica e utilizar um pouco de inversão de depencencia, exemplo no uso do serviço do bcrypt, onde criei uma interface para uso de inversão de depencia, podendo trocar facilmente a biblioteca por outra sem grandes problemas.
Busquei reaproveitar o módulo de banco de dados pois o banco era comportilhado e reutilizar as libs usando os módulos do nx com o nestjs.

# O que faria de melhor

- No endpoint de listar usuários com árvores, só deixaria ver a arvore completa se estiver um nó acima.
- Usar redis ou banco de dados para controle e expiração do token, criando uma black-list de tokens.
- Refatorar o teste unitário de controlle de usuário para e2e, e também fazer testes unitários de auth
