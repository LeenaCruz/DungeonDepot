const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  role: {
    type: String,
    enum: ['gm', 'player'], // Only GM or Player roles allowed
    required: false,
  },
  wallet: {
    type: Number,
    default: 100, // Only applies for players
    min: 0, // Ensure the wallet doesn't go below
  },
  inventory: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item', // Items that the player owns
    },
  ],
  stores: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Store', // Stores owned by GMs
    },
  ]
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
