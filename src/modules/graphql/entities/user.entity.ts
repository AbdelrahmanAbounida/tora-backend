import {
  Directive,
  Field,
  GraphQLISODateTime,
  GraphQLTimestamp,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { AbstractEnttiy } from 'src/database/abstract.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QLPost } from './post.entity';
import { UserRole } from '../constants/user-role.enum';
import { Exclude } from 'class-transformer';

@Entity()
@ObjectType()
export class QLUser extends AbstractEnttiy<QLUser> {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  @Column({ type: 'nvarchar', nullable: true })
  name: string;

  @Column({ type: 'mediumtext', nullable: true })
  @Field({ nullable: true })
  image: string;

  @Column({ type: 'nvarchar' }) // ,unique:true,
  @Field({ nullable: false })
  email: string;

  @Column({ type: 'mediumtext' })
  @Field({ nullable: false })
  @Exclude()
  password: string;

  @Column({ type: 'timestamp', nullable: true }) // , default: () => 'CURRENT_TIMESTAMP'
  @Field(() => GraphQLISODateTime, { nullable: true })
  emailVerified: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => GraphQLISODateTime, { nullable: false })
  createdAt: Date;

  @Column({ type: 'datetime', onUpdate: 'CURRENT_TIMESTAMP', nullable: true }) // , default: () => 'CURRENT_TIMESTAMP'
  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt: Date;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @Field((type) => UserRole, { nullable: false })
  role: UserRole;

  // relations
  @OneToMany((type) => QLPost, (post) => post.owner)
  @Field(() => [QLPost], { name: 'posts', defaultValue: [] })
  posts: QLPost[];

  @ManyToMany((type) => QLPost, (post) => post.users)
  @JoinTable() // no need to create external table
  @Field(() => [QLPost], { name: 'savedPosts', defaultValue: [] })
  savedPosts: QLPost[];
}
