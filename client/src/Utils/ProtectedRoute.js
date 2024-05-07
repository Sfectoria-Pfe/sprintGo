import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";
import LoadingScreen from "../Components/LoadingScreen";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate= useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.isAuthenticated && !user.pending) navigate("/");
  });

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.isAuthenticated && !user.pending) {
          return <Component {...props} />;
        } else return <LoadingScreen />;
      }}
    />
  );
};

export default ProtectedRoute;
