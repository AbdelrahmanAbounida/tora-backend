import { AbstractEnttiy } from 'src/database/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { USER_ROLE_ENUM } from '../constants/role.enum';
import { Exclude, Expose } from 'class-transformer';
import { Post } from 'src/modules/posts/entities/post.entity';

@Entity()
export class User extends AbstractEnttiy<User> {
  @Column({ type: 'nvarchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'mediumtext', nullable: true })
  image: string;

  @Column({ type: 'nvarchar',unique:true, }) // ,unique:true,
  email: string;

  @Column()
  @Exclude()
  @Expose({ name: 'hashedpassword' })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // ,default:new Date()
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Expose({
    name: 'Verification date',
  })
  emailVerified: Date;
 
  @Column({ type: 'enum', enum: USER_ROLE_ENUM })
  role: USER_ROLE_ENUM;

  // relations 
  @ManyToOne(()=>Post,post=>post.owner)
  posts: Post[] 

  @ManyToMany(()=> Post, post=>post.users)
  @JoinTable()
  savedPosts: Post[]
}
