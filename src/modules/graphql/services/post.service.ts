import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQLPost } from '../dto/create-post.input';
import { UpdateQLPost } from '../dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { QLPost } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { UserQLService } from './user.service';

@Injectable()
export class PostQLService {
  constructor(
    @InjectRepository(QLPost)
    private readonly postRepository: Repository<QLPost>,
    private readonly userQLService: UserQLService,
  ) {}

  async create(userId: number, createQLPost: CreateQLPost) {
    // check if user exists
    const user = await this.userQLService.findOne(userId);
    if (!user) {
      throw new NotFoundException('no user found for this id');
    }
    const post = this.postRepository.create(createQLPost);
    post.owner = user;
    await this.postRepository.save(post);
    return post;
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    return post;
  }

  async findUserPosts(userId: number) {
    const user = await this.userQLService.findOne(userId);
    if (!user) {
      throw new NotFoundException('no user found for this id');
    }
    const posts = await this.postRepository.find({
      where: {
        owner: {
          id: userId,
        },
      },
    });
    return posts;
  }

  async findUserSavedPosts(userId: number) {
    const user = await this.userQLService.findOne(userId);
    if (!user) {
      throw new NotFoundException('no user found for this id');
    }
    const posts = await this.postRepository.find({
      where: {
        users: {
          id: userId,
        },
      },
    });
    return posts;
  }

  async findAll() {
    const qlposts = await this.postRepository.find({
      relations: {
        owner: true,
        users: true,
      },
    });
    return qlposts;
  }

  async update(id: number, updatePostQL: UpdateQLPost) {
    try {
      this.postRepository.update(id, updatePostQL);
      return true;
    } catch (error) {
      console.log({ error });
      return false;
    }
  }

  async remove(id: number) {
    try {
      this.postRepository.delete(id);
      return true;
    } catch (error) {
      console.log({ error });
      return false;
    }
  }
}
