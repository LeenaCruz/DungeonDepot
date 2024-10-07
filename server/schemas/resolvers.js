const { User, Item, Store } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const axios = require('axios');

const resolvers = {
  Query: {
    // Fetch items from D&D API and insert them into MongoDB (Limit to 15 items)
    items: async () => {
      try {
        const response = await axios.get('https://www.dnd5eapi.co/api/equipment');
        let items = response.data.results.slice(0, 15);

        const detailedItems = [];

        for (const item of items) {
          const itemResponse = await axios.get(`https://www.dnd5eapi.co/api/equipment/${item.index}`);
          const detailedItem = itemResponse.data;

          detailedItems.push({
            name: detailedItem.name,
            description: detailedItem.desc ? detailedItem.desc.join(' ') : 'No description available',
            cost: detailedItem.cost?.quantity || 0,
            category: detailedItem.equipment_category?.name || 'No category available',
            rarity: detailedItem.rarity || 'No rarity available',
          });
        }

        // Replace existing items with new data
        await Item.deleteMany();
        await Item.insertMany(detailedItems);

        return detailedItems;
      } catch (error) {
        console.error('Error fetching items:', error);
        throw new Error('Failed to fetch items');
      }
    },

    // Fetch a single item by ID
    item: async (parent, { _id }) => {
      return await Item.findById(_id);
    },

    // Fetch logged-in user's data, including inventory
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('inventory.item');
        return user;
      }
      throw new AuthenticationError('You must be logged in');
    },

    // Fetch a store by ID and its items
    store: async (parent, { _id }, context) => {
      if (context.user) {
        const store = await Store.findById(_id).populate('items');
        return store;
      }
      throw new AuthenticationError('You must be logged in');
    }
  },

  Mutation: {
    // Register a new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    // Create a new store (only for logged-in users)
    createStore: async (parent, { name, description }, context) => {
      if (context.user) {
        const store = await Store.create({ name, description, owner: context.user._id });
        await User.findByIdAndUpdate(context.user._id, { $push: { stores: store._id } });  // Update GM's stores
        return store;
      }
      throw new AuthenticationError('You must be logged in');
    },

    // Add an item to a store (only for logged-in users)
    addItemToStore: async (parent, { storeId, name, description, cost, category, rarity }, context) => {
      if (context.user) {
        const store = await Store.findById(storeId);
        if (!store) {
          throw new Error('Store not found');
        }

        const item = await Item.create({ name, description, cost, category, rarity });
        store.items.push(item._id);  // Add the item to the store's items
        await store.save();

        return item;
      }
      throw new AuthenticationError('You must be logged in');
    }
  }
};

module.exports = resolvers;
