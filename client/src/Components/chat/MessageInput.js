import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button } from '@mui/material';

const MessageInput = ({ chatId, senderId, onNewMessage }) => {
  const [text, setText] = useState('');

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:3001/message', { chatId, senderId, text });
      onNewMessage(response.data);
      setText('');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        label="Type a message"
        variant="outlined"
        size="small"
        fullWidth
      />
      <Button onClick={handleSendMessage} variant="contained" color="primary" sx={{ ml: 1 }}>
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;
