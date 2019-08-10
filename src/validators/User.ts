import { InputType, Field, ArgsType, Int } from 'type-graphql';
import { MaxLength, Length, Min, Max, IsEmail, IsDate } from 'class-validator';

@InputType()
export class NewUserDataInput {
  @Field({ nullable: false })
  @Length(5, 255)
  firstname: string;

  @Field({ nullable: false })
  @Length(5, 255)
  lastname: string;

  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsDate()
  birthdate: Date;

  @Field({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  status: number;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  phoneArea: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  lastLogin: Date;
}
