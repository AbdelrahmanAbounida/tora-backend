import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';


@InputType()
export class CreateQLUser {
    @Field({description: 'user email'})
    @IsEmail()
    email: string 

    @Field({description:'user password'})
    password: string 
}

