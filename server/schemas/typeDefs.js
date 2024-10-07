const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!  # GM or Player
    wallet: Int!
    inventory: [Item]
    stores: [Store]
    cart: [CartItem]
  }

  type Store {
    _id: ID!
    name: String!
    description: String
    owner: User!
    items: [Item]
    transactions: [Transaction]
  }

  type Item {
    _id: ID!
    name: String!
    description: String!
    cost: Int!
    category: String!
    rarity: String
  }

  type CartItem {
    item: Item!
    quantity: Int!
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Transaction {
    _id: ID!
    player: User!
    item: Item!
    cost: Int!
    date: String!
  }

  type Query {
    users: [User]
    user(username: String!): User
    stores: [Store]
    store(storeId: ID!): Store
    items(storeId: ID!): [Item]
    item(itemId: ID!): Item
    me: User
  }

  type Mutation {

    addUser(username: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    createStore(name: String!, description: String!): Store

    addItemToStore(storeId: ID!, name: String!, description: String!, cost: Int!, category: String!, rarity: String): Item

    addToCart(itemId: ID!, quantity: Int!): User

    purchaseItems: User

    removeItemFromCart(itemId: ID!): User

  }
`;

module.exports = typeDefs;