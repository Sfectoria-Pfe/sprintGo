const MessageModel = require( "../Models/messageModel");

 const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

 const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    console.log('chatId:', chatId);
    const result = await MessageModel.find({chatId: chatId });
    console.log('result:', result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {

  addMessage,
  getMessages,
};