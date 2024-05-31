import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: '',
	title: '',
	
	boards: [],
	members: [],
	activity: [],
	loading: true,
	
	activityLoading: false,
	allWorkspaces: [],
};

const workspaceSlice = createSlice({
	name: 'workspace',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		successFetchingworkspace: (state, action) => {
			state.id = action.payload._id;
			state.title = action.payload.title;
			
			
			state.boards = action.payload.boards;
			state.members = action.payload.members;
			state.activity = action.payload.activity;
			
		},
		updateTitle: (state, action) => {
			state.title = action.payload;
		},
		setActivityLoading: (state, action) => {
			state.activityLoading = action.payload;
		},
		updateActivity: (state, action) => {
			state.activity = action.payload;
		},
		
		addMembers: (state,action)=>{
			state.members = action.payload;
		},
		successCreatingworkspace: (state, action) => {
			state.allWorkspaces.push(action.payload);
		},
		successDeletingworkspace: (state, action) => {
			state.allWorkspaces = state.allWorkspaces.filter((workspace) => workspace._id !== action.payload);
		},

	},
});

export const {
	setLoading,
	successFetchingworkspace,
	updateTitle,
	setActivityLoading,
	updateActivity,
	successCreatingworkspace,
	successDeletingworkspace,
	addMembers,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
