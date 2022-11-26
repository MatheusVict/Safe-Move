import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from './User.entity';
import { hashSync } from 'bcrypt';
import { MessageHelper } from 'src/helpers/message.helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find({
      select: ['id', 'email', 'userName', 'guardians'],
      relations: { guardians: true },
    });
  }

  async create(data: CreateUserDTO) {
    const createUser = await this.userRepository.create(data);

    await this.userRepository.save(createUser);

    const { password: _, ...withoutPass } = createUser;

    return withoutPass;
  }

  async getOne(options: FindOneOptions<UserEntity>) {
    try {
      const user = await this.userRepository.findOneOrFail(options);

      if (!user) throw new NotFoundException();

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, data: UpdateUserDTO) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException();

    const cryptoPass = hashSync(data.password, 10);

    data.password = cryptoPass;

    await this.userRepository.merge(user, data);

    await this.userRepository.save(user);

    const { password: _, ...User } = user;

    return User;
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    if (user.guardians)
      throw new InternalServerErrorException(
        MessageHelper.User_With_Guardians_Delete,
      );

    await this.userRepository.softDelete({ id });
  }
}
