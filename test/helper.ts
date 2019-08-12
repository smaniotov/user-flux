import mongoose from 'mongoose';
import 'mocha';
import { GET_USER, SIGN_UP, initializeApolloServer, SIGN_IN } from '../src/utils';
import { createTestClient } from 'apollo-server-testing';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test', { useCreateIndex: true, useNewUrlParser: true });

mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', error => {
    console.warn('Error : ', error);
  });

after(() => mongoose.connection.dropDatabase());

export const clearCollection = () =>
  mongoose.connection.collections.users.deleteMany({}).then(() => {});

export class NewUserDataWrapper {
  public name = 'User';
  public email = 'user@example.com';
  public password = '1234567890';
  public phones = [{ number: '12312321321', area: '11' }];

  build = () => {
    return {
      email: this.email,
      password: this.password,
      phones: this.phones,
      name: this.name
    };
  };

  set = (item: string, value: any) => {
    this[item] = value;
    return this;
  };
}

export const getSignUp = async () => {
  const server = initializeApolloServer({ id: Date.now() });
  const { mutate } = createTestClient(server);
  return async newUserData => await mutate({ mutation: SIGN_UP, variables: { newUserData } });
};

export const getSignIn = async () => {
  const server = initializeApolloServer({ id: Date.now() });
  const { query } = createTestClient(server);
  return async (email, password) => await query({ query: SIGN_IN, variables: { email, password } });
};

export const getUserFetch = async (user?: string) => {
  const server = initializeApolloServer({ user, id: Date.now() });
  const { query } = createTestClient(server);
  return async email => await query({ query: GET_USER, variables: { email } });
};

export const DEFAULT_TIMEOUT: number = 10000;
