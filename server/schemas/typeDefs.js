const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    role: String
    wallet: Int
    inventory: [Item]
    stores: [Store]
    cart: [CartItem]
  }

  type Store {
    _id: ID
    name: String
    description: String
    owner: User
    items: [Item]
    transactions: [Transaction]
  }

  type Item {
    _id: ID
    name: String
    description: String
    cost: Int
    type: String
    rarity: String
  }
  
  input ItemInput {
    name: String
    description: String
    cost: Int
    category: String
  } 
  
  type CartItem {
    item: Item
    quantity: Int
  }

  type Auth {
    token: String!
    user: User
  }

  type Transaction {
    _id: ID
    name: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    stores: [Store]
    store(storeId: ID!): Store
    items(storeId: ID!): [Item]
    item(itemId: ID!): Item
    me: User
    getUserWallet: Int
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createStore(name: String!, description: String!): Store
    addItemToStore(storeId: ID!, name: String!, description: String!, cost: Int!, type: String!, rarity: String): Item
    addToCart(itemId: ID!, quantity: Int!): User
    purchaseItems(items: [ItemInput]): User
    removeItemFromCart(itemId: ID!): User
    addItemToShop(storeId: ID!, itemId: ID!): Store
  }
`;

module.exports = typeDefs;