import { ApolloServer } from 'apollo-server-express';
import createSchema from './createSchema';
import mountContext from './mountContext';
import { ResolverData } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { Container } from 'typedi';
import ErrorParser from './ErrorParser';

export default async (externalRequest?: any) => {
  return new ApolloServer({
    schema: await createSchema(),
    playground: { version: '1.7.25' },
    context: request => {
      if (externalRequest) return mountContext(externalRequest);
      return mountContext(request);
    },
    formatResponse: (response: any, { context }: ResolverData<Context>) => {
      Container.reset(context['requestId']);
      return response;
    },
    formatError: ErrorParser
  });
};
