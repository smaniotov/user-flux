import { buildSchema, ResolverData } from 'type-graphql';
import { Container } from 'typedi';
import UserResolver from '../resolvers/UserResolver';

const createSchema = async () => {
  return buildSchema({
    resolvers: [UserResolver],
    container: ({ context }: ResolverData<any>) => {
      return Container.of(context.requestId);
    }
  });
};

export default createSchema;
