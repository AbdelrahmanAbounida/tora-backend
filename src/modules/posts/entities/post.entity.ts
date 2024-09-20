import {Field, ObjectType} from "@nestjs/graphql"
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { AbstractEnttiy } from "src/database/abstract.entity";
import { User } from "src/modules/users/entities/user.entity";

@ObjectType()
@Entity()
export class Post extends AbstractEnttiy<Post> {

    // @Field({nullable:false})
    // @Column()
    // userId 

    @Field()
    @Column()
    title: string 

    @Field()
    @Column()
    image_url: string 

    @Field()
    @Column()
    video_url: string 
    
    @Field()
    @Column()
    prompt: string 

    // relations 
    @ManyToOne(()=>User, user =>user.posts)
    owner:User 

    @ManyToMany(()=>User)
    users: User[]
}