import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGuardiansDTO } from './dto/Create-guardians.dto';
import { UpdateGuardianDTO } from './dto/update-guardian.dto';
import { GuardiansEntity } from './Guardians.entity';
import { hashSync } from 'bcrypt';

@Injectable()
export class GuardiansService {
  constructor(
    @InjectRepository(GuardiansEntity)
    private readonly guardiansRepository: Repository<GuardiansEntity>,
  ) {}

  async getAllGuardians() {
    try {
      return await this.guardiansRepository.find({
        select: ['id', 'email', 'guardianName'],
        relations: {
          user: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('error');
    }
  }

  async getOneGuardian(id: number) {
    const guardian = await this.guardiansRepository.findOne({
      where: { id },
      select: ['id', 'email', 'guardianName'],
      relations: { user: true },
    });

    if (!guardian) throw new NotFoundException();

    return guardian;
  }

  async create(data: CreateGuardiansDTO) {
    try {
      const guardian = await this.guardiansRepository.create(data);

      await this.guardiansRepository.save(guardian);

      const { password: _, ...WhitoutPass } = guardian;

      return WhitoutPass;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, data: UpdateGuardianDTO) {
    const guardian = await this.guardiansRepository.findOneBy({ id });

    if (!guardian) throw new NotFoundException();

    const cryptoPass = hashSync(data.password, 10);

    data.password = cryptoPass;

    await this.guardiansRepository.merge(guardian, data);

    await this.guardiansRepository.save(guardian);

    const { password: _, ...Guardian } = guardian;

    return Guardian;
  }

  async deleteGuardian(id: number) {
    const guardian = await this.guardiansRepository.findOne({ where: { id } });

    if (!guardian) throw new NotFoundException();

    await this.guardiansRepository.softDelete({ id });
  }
}
