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
  query getStore($storeId: ID!) {
    getStore(storeId: $storeId) {
      _id
      name
      owner {
        _id
        username
      }
      items {
        _id
        description
        cost
        name
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
