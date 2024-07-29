import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserLibService} from "../../../../../../libs/user-lib/src/lib/user-lib.service";
import {CreateUserDto} from "../../../../../../libs/user-lib/src/lib/dto/create-user.dto";
import {UpdateUserDto} from "../../../../../../libs/user-lib/src/lib/dto/update-user.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserLibService) {}

  @Get()
  @ApiOperation({description: 'List Employees'})
  findAll() {
    return this.userService.findAll();
  }

  @Get('tree')
  @ApiOperation({description: 'List Employees with Hierarchy'})
  async getUserTree() {
    return await this.userService.getUserWithTree();
  }

  @Get(':id')
  @ApiOperation({description: 'Find Employee by ID'})
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({description: 'Update Employee'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({description: 'Delete Employee'})
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
