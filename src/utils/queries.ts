import { gql } from 'apollo-server-core';

export const GET_USER = gql`
  query getUser($email: String!) {
    getUser(email: $email) {
      name
      email
      phones {
        number
        area
      }
    }
  }
`;

export const SIGN_IN = gql`
  query signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

export const newUserData = gql`
  input NewUserDataInput {
    name: String!
    email: String!
    password: String!
    phones: [NewUserDataInputPhone!]
  }
`;

export const newUserDataPhone = gql`
  input NewUserDataInputPhone {
    number: String!
    area: String!
  }
`;

export const SIGN_UP = gql`
  mutation signUp($newUserData: NewUserDataInput!) {
    signUp(newUserData: $newUserData) {
      name
      email
      phones {
        number
        area
      }
    }
  }
`;
