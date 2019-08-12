import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import gqlSchema from './gqlSchema';
import mountContext from './mountContext';
import { ResolverData } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { Container } from 'typedi';
import ErrorParser from './ErrorParser';

export default (externalRequest: any = null, extra: ApolloServerExpressConfig = {}) => {
  return new ApolloServer({
    ...extra,
    schema: gqlSchema,
    context: ({ req }) => {
      if (externalRequest) return mountContext(externalRequest);
      return mountContext(req);
    },
    formatResponse: (response: any, { context }: ResolverData<Context>) => {
      Container.reset(context['requestI...extra,d']);
      return response;
    },
    formatError: ErrorParser
  });
};
