import { Field, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateQLPost } from './create-post.input';

@InputType()
export class UpdateQLPost extends PartialType(CreateQLPost) {
  @Field(() => Int)
  id: number;
}
