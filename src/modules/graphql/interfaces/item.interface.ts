import { Field, GraphQLISODateTime, InterfaceType } from '@nestjs/graphql';

// use this as interface for all db items
@InterfaceType()
export abstract class BasicItemInterface {
  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;
}
