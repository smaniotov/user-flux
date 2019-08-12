import { Container } from 'typedi';
import { UserService } from '../services';

const tokenSecret = process.env.TOKEN_SECRET || 'test';

export default req => {
  const requestId = req['id'];
  const container = Container.of(requestId);
  const context = { requestId, container, user: req['user'], secret: tokenSecret };
  container.set('context', context);
  container.set('UserService', UserService);
  return context;
};
