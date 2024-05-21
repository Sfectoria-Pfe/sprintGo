import React, { useEffect, useState } from "react";
import Index from "./landingPage/landingPage";
import Login from "./Components/Pages/LoginPage/Login";

import Alert from "./Components/AlertSnackBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Boards from "./Components/Pages/BoardsPage/Boards";

import { loadUser } from "./Services/userService";
import Store from "./Redux/Store";

import Board from "./Components/Pages/BoardPage/Board";
import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./Main";
import { useSelector } from "react-redux";
import Workspaces from "./Components/Pages/WorkspacesPage/Workspaces"
import BoardsW from "./Components/Pages/BoardsWorkspacePage/Boards"
import Create from "./Components/admin/Create";
import Manage from "./Components/admin/Manage";
import JoyMessagesTemplate from "../src/chat/chat";
import Chat from "./Components/chat/Chat";

import EditProfile from "./Components/Pages/EditProfile/EditProfile"
const App = () => {
 
  const [connected, setConnected] = useState("");
  const user = useSelector((state) => state.user);

  console.log(user,"this is user")
 

  useEffect(() => {
    loadUser(Store.dispatch);
  }, [connected]);
  return (
    <BrowserRouter>
      <Alert />
      <Routes>
        {user?.isAuthenticated ? (
          <Route path="/" element={<Main />}>
            <Route index element={<Workspaces />} />
           
            <Route path="/workspace" element={<Workspaces />} />
            <Route path="/workspace/:id" element={<BoardsW />} />
            <Route path="board/:id" element={<Board />} />
            <Route path="/boards" element ={<Boards/>} />
            <Route path ="/create" element={<Create/>} />
            <Route path ="/manage" element={<Manage/>} />
            <Route exact path="/chat" element={<JoyMessagesTemplate/>} />
            <Route path="/newchat" element={<Chat />}/>
            <Route path="/editprofile" element={<EditProfile />} />
           

          </Route>
        ) : (
          <>

            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login setConnected={setConnected}/>} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
