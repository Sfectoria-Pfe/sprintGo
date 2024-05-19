// src/components/ChatList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
const ChatList = ({ userId, setSelectedChat }) => {
  const [chats, setChats] = useState([]);
  const name = useSelector((state) => state.user.userInfo.name);
	const color = useSelector((state) => state.user.userInfo.color);
  const [newChatUserId, setNewChatUserId] = useState('');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/chat/${userId}`);
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats', error);
      }
    };
    fetchChats();
  }, [userId]);

  const handleAddChat = async () => {
    if (newChatUserId) {
      try {
        const response = await axios.post(`http://localhost:3001/chat`, {
          senderId: userId,
          receiverId: newChatUserId,
        });
        setChats([...chats, response.data]);
        setNewChatUserId('');
      } catch (error) {
        console.error('Error creating chat', error);
      }
    }
  };



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        {chats.map((chat) => (
          <ListItem
            button
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
            sx={{ mb: 1, borderRadius: 1, '&:hover': { bgcolor: 'grey.200' } }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: color, fontSize: '0.875rem', fontWeight: '800' }}>
              {name[0]}
            </Avatar>
            <ListItemText primary={chat.members.join(', ')} sx={{ ml: 2 }} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderTop: '1px solid #ccc' }}>
        <TextField
          label="Recipient User ID"
          value={newChatUserId}
          onChange={(e) => setNewChatUserId(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
        />
        <Button onClick={handleAddChat} variant="contained" color="primary" sx={{ ml: 2 }}>
          Add Chat
        </Button>
      </Box>
    </Box>
  );
};

export default ChatList;
