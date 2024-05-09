import React, { useEffect, useState } from "react";
import Index from "./landingPage/landingPage";
import Login from "./Components/Pages/LoginPage/Login";
import Register from "./Components/Pages/RegisterPage/Register";
import Alert from "./Components/AlertSnackBar";
import { BrowserRouter, Routes, Switch,Route } from "react-router-dom";
import Boards from "./Components/Pages/BoardsPage/Boards";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { loadUser } from "./Services/userService";
import Store from "./Redux/Store";
import FreeRoute from "./Utils/FreeRoute";
import Board from "./Components/Pages/BoardPage/Board";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Components/sidebar/sidebar";
import Main from "./Main";
import { useSelector } from "react-redux";
import Workspaces from "./Components/Pages/WorkspacesPage/Workspaces"
import  Workspace  from "./Components/Pages/WorkspacesPage/Workspaces";

const App = () => {
  const [token, setToken] = useState("");
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
            <Route path="/boards" element={<Boards />} />
            <Route path="/workspace" element={<Workspaces />} />
            <Route path="/workspace/:id" element={<Boards />} />
            <Route path="board/:id" element={<Board />} />
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
