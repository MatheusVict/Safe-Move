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

  @Get('auth')
  async findById(@Req() req: any) {
    return await this.userService.getOne({
      where: { id: req.user.id },
      select: ['id', 'email', 'userName'],
      relations: { guardians: true },
    });
  }

  @Put('auth')
  async update(@Req() req: any, @Body() data: UpdateUserDTO) {
    return await this.userService.update(req.user.id, data);
  }

  @Delete('auth')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Req() req: any) {
    await this.userService.deleteUser(req.user.id);
  }
}
