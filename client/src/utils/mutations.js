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

export const PURCHASE_ITEMS = gql `
mutation Mutation($items: [ItemInput]) {
  purchaseItems(items: $items) {
    _id
    wallet
    inventory {
      cost
    }
  }
}
`

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
mutation AddItemToShop($storeId: ID!, $itemId: ID) {
  addItemToShop(storeId: $storeId, itemId: $itemId) {
    _id
    name
    items {
      _id
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
  }
}`;

// export const CREATE_ITEM = gql`
// mutation CreateItem($name: String!, $description: String, $cost: Int, $category: String, $rarity: String ){
// createItem(name: $name, description: $description, cost: $cost, category: $category,rarity: $rarity) {
//   _id
//     name
//     description
//     cost
//     category
//     rarity
// }
// }
// `;


export const CREATE_ITEM = gql`
mutation CreateItem($item: ItemInput!){
  createItem(item: $item){
    _id
    name
    description
    cost
    category
    rarity
  }
}
`