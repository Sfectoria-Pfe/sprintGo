import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./Slices/userSlice";
import alertReducer from "./Slices/alertSlice";
import boardsReducer from "./Slices/boardsSlice";
import boardReducer from "./Slices/boardSlice";
import listReducer from "./Slices/listSlice";
import cardReducer from "./Slices/cardSlice";
import refreshSidebar from "./Slices/refreshSidebar";
import themeSliceReducer from "./Slices/themeSlice";
import workspacesReducer from "./Slices/workspacesSlice";
import workspaceReducer from "./Slices/boardSlice"

const Store = configureStore({
    reducer : {
        user: userReducer,
        alert: alertReducer,
        boards: boardsReducer,
        board: boardReducer,
        list: listReducer,
        card: cardReducer,
        refreshKey: refreshSidebar,
        themeKey: themeSliceReducer,
         workspaces: workspacesReducer,
        workspace: workspaceReducer,
         
    },
}) 
export default Store;