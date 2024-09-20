import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QLUser } from '../entities/user.entity';
import { UserQLService } from '../services/user.service';
import { CreateQLUser } from '../dto/create-userql.input';
import { UpdateQLUser } from '../dto/update-user.input';

@Resolver(() => QLUser)
export class UserQLResolver {
  constructor(private readonly userQLService: UserQLService) {}

  @Mutation(() => QLUser, { name: 'createqluser' })
  createUserQL(@Args('createQlUser') createQlUser: CreateQLUser) {
    return this.userQLService.create(createQlUser);
  }

  @Query(() => [QLUser], { name: 'findallqlusers' })
  findAllUserQL() {
    return this.userQLService.findAll();
  }

  @Query(() => QLUser, { name: 'findqluser' })
  findoneUserQL(@Args('id', { type: () => Int }) id: number) {
    return this.userQLService.findOne(id);
  }

  @Mutation(() => QLUser, { name: 'updateQlUser' })
  udateUserQL(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateQlUser') updateQlUser: UpdateQLUser,
  ) {
    return this.userQLService.update(id, updateQlUser);
  }

  @Mutation(() => QLUser, { name: 'deleteqluser' })
  removeUserQl(@Args('id', { type: () => Int }) id: number) {
    return this.userQLService.remove(id);
  }
}
