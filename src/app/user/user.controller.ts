import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index() {
    return await this.userService.getAllUsers();
  }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return await this.userService.create(data);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.userService.getOne({
      where: { id },
      select: ['id', 'email', 'userName'],
      relations: { guardians: true },
    });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateUserDTO) {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: number) {
    await this.userService.deleteUser(id);
  }

  @Get('teste/oi')
  async go(@Req() req: any) {
    return req.user;
  }
}
