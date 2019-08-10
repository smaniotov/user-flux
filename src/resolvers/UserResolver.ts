import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import 'reflect-metadata';
import UserModel, { IUser } from '../data/schemas/UserModel';
import { NewUserDataInput } from '../validators';
import { UserType } from '../types';

@Resolver(UserType)
export default class UserResolver {
  @Query(returns => UserType)
  async user(@Arg('email') email: string) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  @Query(() => [UserType])
  async users() {
    const users = await UserModel.find({});
    return users;
  }

  @Mutation(returns => UserType)
  async createUser(@Arg('newUserData') newUserData: NewUserDataInput) {
    const newUser: IUser = (await new UserModel({ ...(newUserData as any) }).save()) as any;
    return new UserType(newUser);
  }
}
