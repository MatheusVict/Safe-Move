import { Module } from '@nestjs/common';
import { GuardiansService } from './guardians.service';
import { GuardiansController } from './guardians.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardiansEntity } from './Guardians.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GuardiansEntity])],
  providers: [GuardiansService],
  controllers: [GuardiansController],
})
export class GuardiansModule {}
