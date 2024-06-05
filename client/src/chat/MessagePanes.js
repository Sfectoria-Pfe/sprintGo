import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import AvatarWithStatus from './AvatarWithStatus';
import ChatBubble from './chatBubble';
import MessageInput from './MessageInput';
import MessagesPaneHeader from './MessagesPaneHeader';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";

const MessagesPane = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const { _id: userId } = userInfo;
  const { chat } = props;
  const [chatMessages, setChatMessages] = useState(chat?.messages);
  const [selectedChat, setSelectedChat] = useState(null);
const [newMessages,setNewMessages] = useState([])
  const [textAreaValue, setTextAreaValue] = useState('');
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [sendedMessage, setsendedMessage] = useState(null);
  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);



  useEffect(() => {
    setChatMessages(chat?.messages)
  }, [chat?.messages])

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/message/${chat?._id}`);
      setChatMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };
console.log(chatMessages,"those are the msgs")
  useEffect(() => {
   
    fetchMessages();
  }, [chat?._id]);



  useEffect(() => {
    socket.current = io("ws://localhost:8800", { transports: ['websocket'] });

    socket.current.emit("new-user-add", userId);

    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    socket.current.on("receive-message", (data) => {
      console.log(data,"received ")
      // setNewMessages(data)
      // setReceivedMessage(data)
      setChatMessages(data)
    });

    return () => {
      socket.current.disconnect();
    };
  }, [userId]);

 

  // Update selected chat's messages with the received message
 

  useEffect(() => {
    if (sendedMessage && selectedChat && sendedMessage.chatId === selectedChat._id) {
      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...(prevChat.messages || []), sendedMessage.message],
      }));
    }
  }, [sendedMessage]);

useEffect(()=>{
setChatMessages([...newMessages])
},[newMessages])

  const handleNewMessage = (message) => {
    if (selectedChat) {
      const updatedChat = {
        ...selectedChat,
        messages: [...(selectedChat.messages || []), message],
      };
      setSelectedChat(updatedChat);

      setSendMessage({
        chatId: selectedChat._id,
        senderId: userId,
        receiverId: selectedChat.members.find((id) => id !== userId),
        message: message,
      });
    }
  };

  

  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const handleSendMessage = async () => {
    

    try {
      const response = await axios.post('http://localhost:3001/message', chatMessages);
      handleNewMessage(response.data);
      setText('');
      setError(false);
    } catch (error) {
      console.error('Error sending message', error);
    }
  };



  return (
    <Sheet
      sx={{
        height: { xs: 'calc(100dvh - var(--Header-height))', lg: '100dvh' },
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.level1',
      }}
    >
      <MessagesPaneHeader sender={chat?.members[0]} />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {chatMessages?.map((message, index) => {
            const isYou = message.senderId === userId;
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? 'row-reverse' : 'row'}
              >
                {message.senderId !== userId && (
                  <AvatarWithStatus
                  
                    src="/static/images/avatar/2.jpg"
                  />
                )}
                <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={async() => {
          
    

            try {
              socket.current.emit("send-message",[
                ...chatMessages,
                {
                  chatId: chat?._id,
                  senderId: userId,
                  text: textAreaValue
                },
              ]);
              const response = await axios.post('http://localhost:3001/message',  {
                chatId: chat?._id,
                senderId: userId,
                text: textAreaValue
              });
           
              handleNewMessage(response.data);
              setText('');
              setError(false);
            } catch (error) {
              console.error('Error sending message', error);
            }
          
        
        }}
      />
    </Sheet>
  );
};

export default MessagesPane;
