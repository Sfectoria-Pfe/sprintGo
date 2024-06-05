import React, { useEffect, useRef, useState } from "react";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Box, Chip, IconButton, Input } from "@mui/joy";
import List from "@mui/joy/List";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChatListItem from "./ChatListItem";
import { toggleMessagesPane } from "./utils";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";

const ChatsPane = (props) => {
  const { chats, setSelectedChat, selectedChatId } = props;
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const userInfo = useSelector((state) => state.user.userInfo);
  const { _id: userId } = userInfo;
  const socket = useRef();
  console.log(onlineUsers, "those are online");
  useEffect(() => {
    socket.current = io("ws://localhost:8800", { transports: ["websocket"] });

    socket.current.emit("new-user-add", userId);

    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [userId]);
  useEffect(() => {
    for (let e of onlineUsers) {
      axios
      .get(`http://localhost:3001/user/get-user/${"665ce050f47e6549b154a9a5"}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) =>{
        
        setUsers([...users,res.data])
      }
      );
    
    }
  }, [userId,onlineUsers.length]);
  console.log(users,"those are users")


  const [newChatUserId, setNewChatUserId] = useState('');
  const handleAddChat = async () => {
    if (newChatUserId) {
      try {
        const response = await axios.post(`http://localhost:3001/chat`, {
          senderId: userId,
          receiverId: newChatUserId,
        });
        setSelectedChat([...chats, response.data]);
        setNewChatUserId('');
      } catch (error) {
        console.error('Error creating chat', error);
      }
    }
  };

  return (
    <Sheet
      sx={{
        borderRight: "1px solid",
        borderColor: "divider",
        height: "calc(100dvh - var(--Header-height))",
        overflowY: "auto",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        p={2}
        pb={1.5}
      >
        <Typography
          fontSize={{ xs: "md", md: "lg" }}
          component="h1"
          fontWeight="lg"
          endDecorator={
            <Chip
              variant="soft"
              color="primary"
              size="md"
              slotProps={{ root: { component: "span" } }}
            >
              4
            </Chip>
          }
          sx={{ mr: "auto" }}
        >
          Messages
        </Typography>
        <IconButton
          variant="plain"
          aria-label="edit"
          color="neutral"
          size="sm"
          sx={{ display: { xs: "none", sm: "unset" } }}
        >
          <EditNoteRoundedIcon />
        </IconButton>
        <IconButton
          variant="plain"
          aria-label="edit"
          color="neutral"
          size="sm"
          onClick={() => {
            toggleMessagesPane();
          }}
          sx={{ display: { sm: "none" } }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Stack>
      <Box sx={{ px: 2, pb: 1.5 }}>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Search"
          aria-label="Search"
        />
      </Box>
      <div className="d-flex gap-3">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[{_id:"6651e0ea0fb6391f66362bbf",name:"Ramzi boughamy"},{_id:"6651e0a20fb6391f66362b26",name:"maher"}]}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300 }}
          onChange={(e,v)=>console.log(v?._id)}
          renderInput={(params) => <TextField {...params} label="Users" />}
        />
        <Button onClick={handleAddChat} className={`btn btn-success disabled`}>Add</Button>
      </div>

      <List
        sx={{
          py: 0,
          "--ListItem-paddingY": "0.75rem",
          "--ListItem-paddingX": "1rem",
        }}
      >
        {chats.map((chat) => (
          <ChatListItem
            key={chat._id}
            {...chat}
            setSelectedChat={setSelectedChat}
            selectedChatId={selectedChatId}
          />
        ))}
      </List>
    </Sheet>
  );
};

export default ChatsPane;
