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
        name
        description
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

export const GET_USER_STORES = gql`
  query GetUserStores {
    getUserStores {
      _id
      name
      items {
        _id
        name
      }
    }
  }
`;