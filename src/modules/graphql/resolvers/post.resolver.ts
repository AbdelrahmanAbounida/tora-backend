import { Injectable } from '@nestjs/common';
import { Args, Int, Mutation, Query } from '@nestjs/graphql';
import { QLPost } from '../entities/post.entity';
import { CreateQLPost } from '../dto/create-post.input';
import { PostQLService } from '../services/post.service';
import { UpdateQLPost } from '../dto/update-post.input';

// reolver works as a controller to provide endpoints (query names) and uses services under the hood
@Injectable()
export class PostQLResolver {
  constructor(private readonly postQLService: PostQLService) {}

  @Mutation(() => QLPost, { name: 'createqlpost' })
  async createPostQl(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('createQLPost') createQLPost: CreateQLPost,
  ) {
    return this.postQLService.create(userId, createQLPost);
  }

  @Query(() => QLPost, { name: 'findqlpost' })
  async findPostQl(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.postQLService.findOne(id);
  }

  @Query(() => [QLPost], { name: 'findallposts' })
  async findAllPostsQL() {
    const posts = await this.postQLService.findAll();
    return posts;
  }

  @Query((returns) => [QLPost], { name: 'findAllUserPosts' })
  async findUserPosts(
    @Args({ name: 'userId', type: () => Int }) userId: number,
  ) {
    return this.postQLService.findUserPosts(userId);
  }

  @Query((returns) => [QLPost], { name: 'findAllUserSavedPosts' })
  async findUserSavedPosts(
    @Args({ name: 'userId', type: () => Int }) userId: number,
  ) {
    return this.postQLService.findUserSavedPosts(userId);
  }

  @Mutation(() => QLPost, { name: 'updateqlpost' })
  async updatePostQL(
    @Args({ name: 'id', type: () => Int }) id: number,
    updatePostQL: UpdateQLPost,
  ) {
    return this.postQLService.update(id, updatePostQL);
  }

  @Mutation(() => QLPost, { name: 'deleteqlpost' })
  async deletePostQL(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.postQLService.remove(id);
  }
}
