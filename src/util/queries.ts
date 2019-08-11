const { createTestClient } = require('apollo-server-testing');
const gql = require('graphql-tag');

export const getUser = email => `
  query{
    getUser(email: \"${email}\") {
      name
      email
      phones {
        number
        area
      }
    }
  }`;
