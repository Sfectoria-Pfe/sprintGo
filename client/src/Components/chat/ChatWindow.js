import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const ChatWindow = ({ chatId, receivedMessage }) => {
  const [messages, setMessages] = useState([]);
  const userInfo = useSelector((state) => state.user.userInfo);
  const userId = userInfo._id;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/message/${chatId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    };
    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    if (receivedMessage && receivedMessage.chatId === chatId) {
      setMessages((prevMessages) => [...prevMessages, receivedMessage.message]);
    }
  }, [receivedMessage, chatId]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '80vh', padding: 2 }}>
      <Typography variant="h6" gutterBottom>Chat Messages</Typography>
      {messages.map((message) => (
        <MessageBubble
          key={message._id}
          message={message}
          isSender={message.senderId === userId}
        />
      ))}
    </Box>
  );
};

const MessageBubble = ({ message, isSender }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isSender ? 'flex-end' : 'flex-start',
        marginY: 1,
      }}
    >
      <Box
        component={Paper}
        elevation={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 1,
          maxWidth: '60%',
          borderRadius: 2,
          backgroundColor: isSender ? 'primary.light' : 'grey.300',
        }}
      >
        {/* <Avatar sx={{ marginRight: isSender ? 0 : 1, marginLeft: isSender ? 1 : 0 }}>
          {message.senderId[0]}
        </Avatar> */}
        <Box>
          <Typography variant="body2">{message.text}</Typography>
          {/* <Typography variant="caption" color="textSecondary">{message.senderId}</Typography> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatWindow;
