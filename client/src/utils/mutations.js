import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_ITEM_TO_SHOP = gql`
mutation AddItemToShop($storeId: ID!, $itemId: ID!) {
  addItemToShop(storeId: $storeId, itemId: $itemId) {
    _id
    name
    items {
      id
      name
    }
  }
}`;

export const CREATE_STORE = gql`
mutation CreateStore($name: String!, $description: String!){
  createStore(name:$name, description: $description) {
    _id
    name
    description
    owner {
      username
    }
    items {
      name
    }
  }
}`;



