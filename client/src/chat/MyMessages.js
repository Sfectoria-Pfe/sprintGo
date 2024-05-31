import React, { useEffect, useState } from 'react';
import Sheet from '@mui/joy/Sheet';

import MessagesPane from './MessagePanes';



import { chatss } from './data';
import ChatsPane from './chatsPane';
import { useSelector } from 'react-redux';
import axios from 'axios';
const MyMessages = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const { _id: userId } = userInfo;
  const [chats, setChats] = useState([]);

  const [selectedChat, setSelectedChat] = useState();



  const fetchChats = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/chat/${userId}`);
      setChats(response.data.map(e=>{
        return (
          {...e,members:e.members.filter(e=>e._id !== userId)}
        )
      }));
      setSelectedChat(response.data.map(e=>{
        return (
          {...e,members:e.members.filter(e=>e._id !== userId)}
        )
      })[0])
      console.log(response.data,"those are the chatrooms")
    } catch (error) {
      console.error('Error fetching chats', error);
    }
  };
console.log(chats,"those are the final chats")
  useEffect(() => {
    fetchChats();
  }, [userId]);


  return (
    <Sheet
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: { xs: 'var(--Header-height)', sm: 0 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(min-content, min(30%, 400px)) 1fr',
        },
      }}
    >
      <Sheet
        sx={{
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '100%',
          top: 52,
        }}
      >
        <ChatsPane
          chats={chats}
          selectedChatId={selectedChat?._id}
          setSelectedChat={setSelectedChat}
        />
      </Sheet>
      <MessagesPane chat={selectedChat} />
    </Sheet>
  );
};

export default MyMessages;
