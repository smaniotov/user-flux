import { buildSchema, ResolverData, buildSchemaSync } from 'type-graphql';
import { Container } from 'typedi';
import UserResolver from '../resolvers/UserResolver';

const schema = buildSchemaSync({
  resolvers: [UserResolver],
  container: ({ context }: ResolverData<any>) => {
    return Container.of(context.requestId);
  }
});

export default schema;
