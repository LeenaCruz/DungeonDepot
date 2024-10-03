const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Reference to the GM who owns this store
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item', // List of items the store sells
    },
  ],
  transactions: [
    {
      player: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the player who made the purchase
      },
      item: {
        type: Schema.Types.ObjectId,
        ref: 'Item', // The purchased item
      },
      cost: {
        type: Number,
        required: true, // The cost of the purchased item
      },
      date: {
        type: Date,
        default: Date.now, // When the transaction occurred
      },
    },
  ],
});

const Store = model('Store', storeSchema);

module.exports = Store;
