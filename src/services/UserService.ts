import {
  ApolloError,
  AuthenticationError,
  PersistedQueryNotFoundError,
  PersistedQueryNotSupportedError
} from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import { default as jwt } from 'jsonwebtoken';
import 'reflect-metadata';
import { Inject, Service } from 'typedi';
import { IUser, UserModel } from '../data';
import { ErrorEnum } from '../enums';

const SALT_ROUNDS = 8;

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

    user.updatedAt = new Date();
    user.lastLogin = new Date();
    await user.save();

    return jwt.sign(email, this.context['secret']);
  };

  public createUser = async (user: IUser): Promise<IUser> => {
    const hash: string = await bcrypt.hash(user.password, SALT_ROUNDS);
    try {
      const savedUser = await new UserModel({ ...user, ...{ password: hash } }).save();
      return savedUser;
    } catch (e) {
      if (e.code === 11000) {
        throw new ApolloError('User already exists.', ErrorEnum.Conflict);
      }

      throw new PersistedQueryNotSupportedError();
    }
  };
}
