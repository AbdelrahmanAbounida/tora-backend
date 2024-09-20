import {
  Directive,
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEnttiy } from 'src/database/abstract.entity';
import { QLUser } from './user.entity';
import { BasicItemInterface } from '../interfaces/item.interface';

@ObjectType({
  implements: () => [BasicItemInterface],
})
@Entity()
export class QLPost extends AbstractEnttiy<QLPost> {
  // @Field({nullable:false})
  // @Column()
  // userId

  @PrimaryGeneratedColumn()
  @Field(() => Int) // ID
  id: number;

  @Field()
  @Column()
  title: string;

  // ::TODO:: remove this optional
  @Field({ nullable: true })
  @Column({ nullable: true })
  image_url?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  video_url?: string;

  @Field()
  @Column()
  prompt: string;

  // relations
  @ManyToOne((type) => QLUser, (user) => user.posts)
  @Field(() => QLUser)
  owner: QLUser;

  @ManyToMany((type) => QLUser, (user) => user.savedPosts)
  @Field(() => [QLUser])
  users: QLUser[];

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;
}
