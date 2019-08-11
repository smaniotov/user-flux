import express from 'express';
import { UserService } from '../../services';
import UserResolver from '../../resolvers/UserResolver';
const router = express.Router();

router.get('/:email', async (req, res) => {
  const resolver = new UserResolver(new UserService());
  const { email } = req.params;
});

router.post('/signIn', (req, res) => {
  console.log(req, res);
  res.send({});
});

router.post('/sign-up', (req, res) => {
  console.log(req, res);
  res.send({});
});

export default router;
