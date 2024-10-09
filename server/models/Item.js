const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true, // descripes the item (Stats and abilities)
    },
    cost: {
        type: Number,
        required: true, // cost of the item in gold
    },
    category: { // ??? would this me type or category ???
        type: String,
        required: true, // type of item 'weapon', 'armor', 'potion'
    },
    rarity: {
        type: String, // 'common', 'rare', 'legendary'
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store', // Reference to the store where the item is sold
    },
})

const Item = model('Item', itemSchema);

module.exports = Item;