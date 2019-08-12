import cors from 'cors';
import express from 'express';
import expressJwt from 'express-jwt';
import expressRequestId from 'express-request-id';
import mongoose from 'mongoose';
import { userRoute } from './routes';
import { initializeApolloServer } from './utils';
import bodyParser = require('body-parser');

const tokenSecret = process.env.TOKEN_SECRET || 'test';
const databaseURL: string = process.env.DATABASE || 'mongodb://localhost:27017/flow';

mongoose.connect(databaseURL, { useNewUrlParser: true, useCreateIndex: true });

const start = async () => {
  const app = express();

  app.use(cors());
  app.use(expressRequestId());
  app.use(bodyParser());

  const server = await initializeApolloServer();

  app.use(
    expressJwt({
      secret: tokenSecret,
      credentialsRequired: false
    })
  );

  server.applyMiddleware({ app });

  app.use('/users', await userRoute());

  app.listen(8080, () => {
    console.log('Running a GraphQL API server at localhost:8080/graphql');
  });
};

start();
