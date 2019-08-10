import { buildTypeDefsAndResolvers } from 'type-graphql';
import UserResolver from './resolvers/UserResolver';

export const createConfig = async () => buildTypeDefsAndResolvers({ resolvers: [UserResolver] });
