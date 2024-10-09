import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;


export const GET_STORE = gql`
  query GetStore($storeId: ID!) {
    getStore(storeId: $storeId) {
      id
      name
      items {
        id
        name
        category
        cost
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      wallet
      inventory {
        name
      }
    }
  }
`;
