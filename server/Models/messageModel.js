const mongoose = require( "mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      ref: 'Chat',
    },
    senderId: {
      type: String,
      ref: 'User'
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Message', messageSchema);