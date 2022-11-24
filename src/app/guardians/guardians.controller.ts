import { Controller, Get } from '@nestjs/common';
import { GuardiansService } from './guardians.service';

@Controller('guardians')
export class GuardiansController {
  constructor(private readonly guardianService: GuardiansService) {}

  @Get()
  async getAll() {
    return await this.guardianService.getAllGuardians();
  }
}
