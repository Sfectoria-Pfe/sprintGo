import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspacesData: [],
  pending: true,
  
  // smallPostfix:
  //   "?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjM2NjUzNDgz&ixlib=rb-1.2.1&q=80&w=400",
  creating: false,
};

const workspacesSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    startFetchingworkspaces: (state) => {
      state.pending = true;
    },
    successFetchingworkspaces: (state, action) => {
      state.workspacesData = action.payload.workspaces;
      state.pending = false;
    },
    failFetchingworkspaces: (state) => {
      state.pending = false;
    },
    startCreatingworkspace: (state) => {
      state.creating = true;
    },
    successCreatingworkspace: (state, action) => {
      state.workspacesData.push(action.payload);
      state.creating = false;
    },
    failCreatingworkspace: (state) => {
      state.creating = true;
    },
    reset:(state)=>{
      state=initialState;
    }
  },
});

export const {
  startFetchingworkspaces,
  successFetchingworkspaces,
  failFetchingworkspaces,
  startCreatingworkspace,
  successCreatingworkspace,
  failCreatingworkspace,
  reset
} = workspacesSlice.actions;
export default workspacesSlice.reducer;
