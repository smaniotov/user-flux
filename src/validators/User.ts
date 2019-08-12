import { IsDate, IsEmail, Length, ValidateNested } from 'class-validator';
import 'reflect-metadata';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewUserDataInput {
  @Field(() => String)
  @Length(2, 255)
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @Length(3, 50)
  password: string;

  @Field(() => [NewUserDataInputPhone], { nullable: true })
  // @ValidateNested()
  phones: NewUserDataInputPhone[];
}

@InputType()
export class NewUserDataInputPhone {
  @Field(() => String)
  number: string;

  @Field(() => String)
  area: string;
}
