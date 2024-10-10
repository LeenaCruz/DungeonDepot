const { User, Item } = require('../models');
const Store = require('../models/Store')
const { signToken, AuthenticationError } = require('../utils/auth');
const axios = require('axios');
const { ObjectId } = require('mongoose').Types


const resolvers = {
  Query: {
    // items: async () => {
    //   try {
    //     // Fetch the list of equipment
    //     const response = await axios.get('https://www.dnd5eapi.co/api/equipment');
    //     const items = response.data.results; // Get the list of items

    //     // Array to hold detailed item data
    //     const detailedItems = [];

    //     // Loop through each item to fetch detailed information
    //     for (const item of items) {
    //       const itemResponse = await axios.get(`https://www.dnd5eapi.co/api/equipment/${item.index}`);
    //       const detailedItem = itemResponse.data;

    //       // Push the detailed item to the array
    //       detailedItems.push({
    //         name: detailedItem.name,
    //         description: detailedItem.description ? detailedItem.description.join(' ') : 'No description available',
    //         cost: detailedItem.cost.quantity ? detailedItem.cost.quantity.join(' ') : 'No cost available',
    //         category: detailedItem.equipment_category.name ? detailedItem.equipment_category.name.join(' ') : 'No category available',
    //         rarity: detailedItem.rarity ? detailedItem.rarity.join('') : 'No rarity availiable',
    //       });
    //     }

    //     // Insert detailed items into MongoDB
    //     await Item.insertMany(detailedItems);

    //     return detailedItems; // Return the detailed items
    //   } catch (error) {
    //     console.error('Error fetching items from D&D API:', error);
    //     throw new Error('Failed to fetch items');
    //   }
    // },

    items: async (parent, { item, name, category }) => {
      const params = {};

      if (category) {
        params.items.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Item.find(params).populate('category');
    },

    item: async (parent, { _id }) => {
      return await Item.findById(_id).populate('item');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'inventory.item',
          populate: 'item'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
        console.log(user);
        return user;
      }
      throw AuthenticationError;
    },
    getStore: async (_, { storeId }) => {
      if (context.user) {
        // Find the store by ID and populate the items
        const store = await Store.findById(storeId).populate('items');

        if (!store) {
          throw new Error('Store not found');
        }

        return store;
      }
      throw AuthenticationError;
    },

    // Trying to get userWallet
    //     getUserWallet: async (_,__, {context}) => {
    // if (!context.user) {
    //   throw new AuthenticationError('You must be logged in');
    // }

    // const {wallet} = await User.findById(context.user._id);
    // return wallet;
    //     }

  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    //old addItemToShop
    // addItemToShop: async (_, { storeId, itemId }, { dataSources }) => {
    //   try {
    //     const store = await dataSources.Store.findById(storeId)
    //     if (!store) {
    //       throw new Error('Store not found');
    //     }
    //     store.items.push(itemId);
    //     await store.save();
    //     return store;
    //   } catch (error) {
    //     throw new Error('Failed to add item')
    //   }
    // },


    createItem: async (parent,  {item }, context) => {
      console.log("Im the item full:", item)
      if (!context.user) {
        throw AuthenticationError
      }

      let newItem = await Item.findOne({ name: item.name });

      if (!newItem) {
        newItem = await Item.create({
          name: item.name,
          description: item.desc,
          cost: item.cost.quantity,
          category: item.equipment_category.name,
          rarity: item.rarity,
        })
      }

      Item.push(newItem._id);

    },


    addItemToShop: async (_, { storeId, itemId }) => {
      try {
        console.log("Im the itemId:", itemId);
        console.log("Im the storeId when adding an item:", storeId)
        const store = await Store.findById(ObjectId(storeId));
        if (!store) {
          throw new Error('Store not found');
        }


        store.items.push(itemId);
        await store.save();
        return store;
      } catch (error) {
        throw new Error('Failed to add item');
      }
    },



    createStore: async (parent, { name, description }, context) => {
      if (!context.user) {
        throw AuthenticationError
      }

      try {
        const newStore = await Store.create({
          name,
          description,
          owner: context.user._id,
        });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { stores: newStore._id },
        },
          { new: true }
        );
        console.log('Store successfully created:', newStore)
        return newStore;
      } catch (err) {
        console.error('Error creating store:', err);;
        throw new Error('Store creation failed')
      }
    },

    purchaseItems: async (parent, args, context) => {
      if (context.user) {
        // array of items
        const items = args.items
        const itemCost = items.reduce((currentValue, element) => {
          return currentValue + element.cost
        }, 0)
        const createdCartItems = await Item.insertMany(items)
        const user = await User.findById(context.user._id)
        user.wallet -= itemCost
        user.inventory = [...user.inventory, ...createdCartItems.map(i => i._id)]
        await user.save()
        return user
      }
      return AuthenticationError
    }
  }
};

module.exports = resolvers;


// addUser: async (parent, args) => {
//   const user = await User.create(args);
//   const token = signToken(user);

//   return { token, user };
// },
// addOrder: async (parent, { products }, context) => {
//   if (context.user) {
//     const order = new Order({ products });

//     await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

//     return order;
//   }

//   throw AuthenticationError;
// },
// updateUser: async (parent, args, context) => {
//   if (context.user) {
//     return await User.findByIdAndUpdate(context.user._id, args, { new: true });
//   }

//   throw AuthenticationError;
// },
// updateProduct: async (parent, { _id, quantity }) => {
//   const decrement = Math.abs(quantity) * -1;

//   return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
// },
// login: async (parent, { email, password }) => {
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw AuthenticationError;
//   }

//   const correctPw = await user.isCorrectPassword(password);

//   if (!correctPw) {
//     throw AuthenticationError;
//   }

//   const token = signToken(user);

//   return { token, user };
// }