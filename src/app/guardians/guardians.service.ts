import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuardiansEntity } from './Guardians.entity';

@Injectable()
export class GuardiansService {
  constructor(
    @InjectRepository(GuardiansEntity)
    private readonly guardiansRepository: Repository<GuardiansEntity>,
  ) {}

  async getAllGuardians() {
    return await this.guardiansRepository.find({
      select: ['id', 'email', 'guardianName', 'user'],
    });
  }
}
