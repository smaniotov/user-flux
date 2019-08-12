import { ForbiddenError } from 'apollo-server-core';
import { IUser } from '../data/schemas/UserModel';
import { Authenticated } from '../decorators';
import 'reflect-metadata';
import { UserService } from '../services';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { UserTokenType, UserType } from '../types';
import { NewUserDataInput } from '../validators';

@Service()
@Resolver(UserType)
export default class UserResolver {
  @Inject('context')
  private readonly context;

  constructor(private readonly userService: UserService) {}

  @Authenticated()
  @Query(() => UserType)
  async getUser(@Arg('email') email: string) {
    const user = await this.userService.findOne(email);

    if (this.context['user'] !== user.email) {
      throw new ForbiddenError('User is not allowed to access this content.');
    }

    return user;
  }

  @Query(() => UserType)
  async test(@Arg('email') email: string) {
    return new UserType({
      phones: [{ area: '11', number: '12321312' }],
      name: 'adsad',
      email: 'test'
    } as IUser);
  }

  @Query(() => UserTokenType)
  async signIn(@Arg('email') email: string, @Arg('password') password: string) {
    const token: string = await this.userService.signIn(email, password);
    return new UserTokenType(token);
  }

  @Mutation(() => UserType)
  async signUp(@Arg('newUserData') newUserData: NewUserDataInput) {
    const newUser = await this.userService.createUser(newUserData as IUser);
    return new UserType(newUser);
  }
}
