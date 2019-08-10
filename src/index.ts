import cors from 'cors';
import express from 'express';
import { createConfig } from './graphConfig';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const start = async () => {
  const app = express();

  app.use(cors());
  const { resolvers, typeDefs } = await createConfig();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: { version: '1.7.25' }
  });

  server.applyMiddleware({ app });

  app.listen(8080, () => {
    console.log('Running a GraphQL API server at localhost:8080/graphql');
  });
};

start();
