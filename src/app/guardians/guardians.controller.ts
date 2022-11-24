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
} from '@nestjs/common';
import { CreateGuardiansDTO } from './dto/Create-guardians.dto';
import { UpdateGuardianDTO } from './dto/update-guardian.dto';
import { GuardiansService } from './guardians.service';

@Controller('guardians')
export class GuardiansController {
  constructor(private readonly guardianService: GuardiansService) {}

  @Get()
  async getAll() {
    return await this.guardianService.getAllGuardians();
  }

  @Get(':id')
  async index(@Param('id') id: number) {
    return await this.guardianService.getOneGuardian(id);
  }

  @Post()
  async create(@Body() data: CreateGuardiansDTO) {
    return await this.guardianService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateGuardianDTO) {
    return await this.guardianService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    return await this.guardianService.deleteGuardian(id);
  }
}
