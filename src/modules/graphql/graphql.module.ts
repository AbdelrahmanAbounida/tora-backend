import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserQLResolver } from './resolvers/user.resolver';
import { UserQLService } from './services/user.service';
import { PostQLResolver } from './resolvers/post.resolver';
import { PostQLService } from './services/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QLUser } from './entities/user.entity';
import { QLPost } from './entities/post.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // graphql server adapter
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // true,
      // include:[] // defien which resolver to use
    }),
    TypeOrmModule.forFeature([QLUser, QLPost]),
  ],
  providers: [UserQLResolver, UserQLService, PostQLResolver, PostQLService],
})
export class GraphqlModule {}
