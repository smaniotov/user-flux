import { createMethodDecorator } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-core';

// tslint:disable-next-line: variable-name
export const Authenticated = () => {
  return createMethodDecorator(async ({ context = {} }, next) => {
    if (!context['user']) {
      throw new AuthenticationError('User must be logged to access this content.');
    }

    return next();
  });
};
