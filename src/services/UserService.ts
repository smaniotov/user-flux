import { AuthenticationError, ForbiddenError } from 'apollo-server-core';
import { PersistedQueryNotFoundError } from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import { default as jwt } from 'jsonwebtoken';
import 'reflect-metadata';
import { Inject, Service } from 'typedi';
import { IUser, UserModel } from '../data';

const SALT_ROUNDS = 16;

@Service()
export default class UserService {
  @Inject('context')
  private readonly context;

  public findOne = async (email: string): Promise<IUser> => {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new PersistedQueryNotFoundError();
    }

    return user;
  };

  public signIn = async (email: string, password: string): Promise<string> => {
    const user = await this.findOne(email);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AuthenticationError('Incorrect password');
    }

    return jwt.sign(email, 'TypeGraphQL');
  };

  public createUser = async (user: IUser) => {
    const hash: string = await bcrypt.hash(user.password, SALT_ROUNDS);
    return await new UserModel({ ...user, ...{ password: hash } }).save();
  };
}
