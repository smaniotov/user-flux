import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';
import { IUser } from '../data/schemas/UserModel';
import { ValidateNested } from 'class-validator';

@ObjectType()
export class UserType {
  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.phones = user.phones;
  }

  @Field({ nullable: true })
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => [UserPhone], { nullable: true })
  @ValidateNested()
  phones?: UserPhone[];
}

@ObjectType()
export class UserPhone {
  @Field()
  number: string;

  @Field()
  area: string;
}

@ObjectType()
export class UserTokenType {
  constructor(token: string) {
    this.token = token;
  }

  @Field(() => String)
  token: string;
}
