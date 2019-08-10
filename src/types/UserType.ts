import { ObjectType, Field, ID } from 'type-graphql';
import { IUser } from '../data/schemas/UserModel';

@ObjectType()
export default class UserType {
  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
  }

  @Field({ nullable: true })
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field()
  lastname: string;
}
