import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const userInfo = useSelector((state) => state.user.userInfo);
  const { _id: userId } = userInfo;

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [sendedMessage, setsendedMessage] = useState(null);
  const socket = useRef();

  // Connect to Socket.io and set up event listeners
  useEffect(() => {
    socket.current = io("ws://localhost:8800", { transports: ['websocket'] });

    socket.current.emit("new-user-add", userId);

    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    socket.current.on("receive-message", (data) => {
      setReceivedMessage(data);
      console.log(data,"this is the data")
    });

    return () => {
      socket.current.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    if (sendMessage) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Update selected chat's messages with the received message
  useEffect(() => {
    if (receivedMessage && selectedChat && receivedMessage.chatId === selectedChat._id) {
      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...(prevChat.messages || []), receivedMessage.message],
      }));
    }
  }, [receivedMessage]);

  useEffect(() => {
    if (sendedMessage && selectedChat && sendedMessage.chatId === selectedChat._id) {
      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...(prevChat.messages || []), sendedMessage.message],
      }));
    }
  }, [sendedMessage]);



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

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Chat 
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, height: '70vh', overflowY: 'auto' }}>
            <ChatList userId={userId} setSelectedChat={setSelectedChat} />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, height: '70vh', display: 'flex', flexDirection: 'column' }}>
            {selectedChat ? (
              <>
                <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
                  <ChatWindow
                    chatId={selectedChat._id}
                    receivedMessage={receivedMessage}
                    onNewMessage={handleNewMessage}
                  />
                </Box>
                <Box>
                  <MessageInput
                    chatId={selectedChat._id}
                    senderId={userId}
                    onNewMessage={handleNewMessage}
                  />
                </Box>
              </>
            ) : (
              <Typography variant="h6" align="center" sx={{ mt: 10 }}>
                Select a chat to start messaging
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
