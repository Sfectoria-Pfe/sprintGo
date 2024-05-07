import React, { createContext, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./MyStyles.css";
import Sidebar from "./Sidebar";
import Welcome from "./Welcome";
import ChatArea from "./ChatArea";
import Users from "./Users";
import Groups from "./Group";
import CreateGroups from "./CreateGroup";

export const myContext = createContext();

function MainContainer(props) {
  const { match } = props;  // Extracting match from props
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const [refresh, setRefresh] = useState(true);

  return (
    <div className={"main-container" + (lightTheme ? "" : " dark")}>
      <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
        <Sidebar />
        <Switch>
          <Route path={`${match.url}/welcome`} component={Welcome} />
          <Route path={`${match.url}/chat/:_id`} component={ChatArea} />
          <Route path={`${match.url}/users`} component={Users} />
          <Route path={`${match.url}/groups`} component={Groups} />
          <Route path={`${match.url}/create-groups`} component={CreateGroups} />
        </Switch>
      </myContext.Provider>
    </div>
  );
}

export default withRouter(MainContainer);
