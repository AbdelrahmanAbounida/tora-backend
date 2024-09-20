import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQLUser } from '../dto/create-userql.input';
import { UpdateQLUser } from '../dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { QLUser } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserQLService {
  constructor(
    @InjectRepository(QLUser)
    private readonly qluserRepository: Repository<QLUser>,
  ) {}
  async create(createQLUser: CreateQLUser) {
    const userExist = await this.findOneByEmail(createQLUser.email);
    if (userExist) {
      throw new ConflictException('Email already exist');
    }
    const user = this.qluserRepository.create(createQLUser);
    await this.qluserRepository.save(user);
    return user;
  }

  async findAll() {
    const qlusers = await this.qluserRepository.find({
      relations: {
        posts: true,
        savedPosts: true,
      },
    });
    return qlusers;
  }

  async findOne(id: number) {
    const user = await this.qluserRepository.findOne({
      where: { id },
      relations: {
        posts: true,
        savedPosts: true,
      },
    }); // findOneBy doesn't support relations
    return user;
  }
  async findOneByEmail(email: string) {
    const user = await this.qluserRepository.findOneBy({ email });
    return user;
  }

  async update(id: number, updateGraphqlInput: UpdateQLUser) {
    const userExist = await this.findOne(id);

    if (!userExist) {
      throw new NotFoundException('There is no user with this id');
    }

    await this.qluserRepository.update(id, updateGraphqlInput);
    return userExist;
  }
  async remove(id: number) {
    const userExist = await this.findOne(id);
    console.log({ userExist });
    if (!userExist) {
      throw new NotFoundException('There is no user with this id');
    }
    await this.qluserRepository.delete(id);
    return userExist;
  }
}
