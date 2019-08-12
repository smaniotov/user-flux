import { createTestClient } from 'apollo-server-testing';
import express from 'express';
import get from 'lodash/get';
import { GET_USER, initializeApolloServer, SIGN_IN, SIGN_UP } from '../../utils';

const router = express.Router();

const userRouter = async () => {
  router.get('/', async (req, res) => {
    const { email } = req.query;

    try {
      const { query } = await createTestClient(await initializeApolloServer(req));
      const result = await query({ query: GET_USER, variables: { email } });
      send(result, res);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });

  router.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;

    try {
      const { query } = await createTestClient(await initializeApolloServer(req));
      const result = await query({ query: SIGN_IN, variables: { email, password } });
      send(result, res);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });

  router.post('/', async (req, res) => {
    const { email, password, name, phones } = req.body;

    const newUserData = {
      email,
      password,
      name,
      phones
    };

    try {
      const { mutate } = await createTestClient(await initializeApolloServer(req));
      const result = await mutate({ mutation: SIGN_UP, variables: { newUserData } });
      send(result, res);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });

  return router;
};
const send = (result, res) => {
  if (result.errors) {
    return res.status(get(result, 'errors[0].statusCode', 500)).send(result.errors);
  }
  res.send(result.data);
};

export default userRouter;
