import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspacesData: [],
  pending: true,
  
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
