import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateQLPost {
  @Field({ description: 'post title' })
  title: string;

  @Field({ description: 'prompt used to generate video' })
  prompt: string;

  @Field({ nullable: true, defaultValue: true })
  showowner?: boolean;
}
