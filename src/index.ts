import { Context } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import expressJwt from 'express-jwt';
import expressRequestId from 'express-request-id';
import { graphql } from 'graphql';
import mongoose from 'mongoose';
import { ResolverData } from 'type-graphql';
import { Container } from 'typedi';
import createSchema from './util/createSchema';
import ErrorParser from './util/ErrorParser';
import mountContext from './util/mountContext';
import { getUser } from './util';

const tokenSecret = process.env.TOKEN_SECRET || 'test';
const databaseURL: string = process.env.DATABASE || 'mongodb://localhost:27017/test';

mongoose.connect(databaseURL, { useNewUrlParser: true });

const path = '/graphql';

const start = async () => {
  const app = express();

  app.use(cors());
  app.use(expressRequestId());

  const server = new ApolloServer({
    schema: await createSchema(),
    playground: { version: '1.7.25' },
    context: ({ req }) => {
      return mountContext(req);
    },
    formatResponse: (response: any, { context }: ResolverData<Context>) => {
      Container.reset(context['requestId']);
      return response;
    },
    formatError: ErrorParser
  });

  app.use(
    path,
    expressJwt({
      secret: tokenSecret,
      credentialsRequired: false
    })
  );

  server.applyMiddleware({ app });

  app.post('/users/:email', async (req, res, next) => {
    const { email } = req.params;

    const query = getUser({ email });

    const context = mountContext(req);
    const result = await graphql({
      schema: await createSchema(),
      contextValue: context,
      source: query
    });
    console.log(result);
    res.send(result);
  });

  // app.use('/users', userRoute);

  app.listen(8080, () => {
    console.log('Running a GraphQL API server at localhost:8080/graphql');
  });
};

start();
