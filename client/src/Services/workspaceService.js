import axios from 'axios';
import {
	setLoading,
	
	successFetchingBoard,
	updateTitle,
    successCreatingboard,
	successDeletingboard,
} from '../Redux/Slices/boardSlice';
import { openAlert } from '../Redux/Slices/alertSlice';
import { addMembers, setActivityLoading, updateActivity, updateBackground, updateDescription } from '../Redux/Slices/workspaceSlice';

const boardRoute = 'http://localhost:3001/board';
const workspaceRoute = 'http://localhost:3001/workspace';

export const getboards = async (workspaceId, dispatch) => {
	dispatch(setLoading(true));
	try {
		const res = await axios.get(boardRoute + '/' + workspaceId);
		dispatch(successFetchingBoard(res.data));
		setTimeout(() => {
			dispatch(setLoading(false));
		}, 300);
	} catch (error) {
		dispatch(setLoading(false));
		dispatch(
			openAlert({
				message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
				severity: 'error',
			})
		);
	}
};

export const activityUpdate = async (workspaceId, dispatch) => {
	dispatch(setActivityLoading(true));
	try {
		const res = await axios.get(workspaceRoute + '/' + workspaceId + '/activity');
		dispatch(updateActivity(res.data));
		dispatch(setActivityLoading(false));
	} catch (error) {
		dispatch(setActivityLoading(false));
		dispatch(
			openAlert({
				message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
				severity: 'error',
			})
		);
	}
};

export const createboard = async (title, workspaceId, dispatch) => {
	dispatch(setLoading(true));
	try {
		const res = await axios.post(boardRoute + '/create', { title: title, workspaceId: workspaceId });
		dispatch(successCreatingboard(res.data));
		dispatch(setLoading(false));
	} catch (error) {
		dispatch(setLoading(false));
		dispatch(
			openAlert({
				message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
				severity: 'error',
			})
		);
	}
};

export const Deleteboard = async (boardId, workspaceId, dispatch) => {
	dispatch(setLoading(true));
	try {
		await axios.delete(boardRoute + '/' + workspaceId + '/' + boardId);
		await dispatch(successDeletingboard(boardId));
		dispatch(setLoading(false));
	} catch (error) {
		dispatch(setLoading(false));
		dispatch(
			openAlert({
				message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
				severity: 'error',
			})
		);
	}
};

export const boardTitleUpdate = async (boardId, workspaceId, title, dispatch) => {
	try {
		await dispatch(updateTitle({ boardId: boardId, title: title }));
		await axios.put(boardRoute + '/' + workspaceId + '/' + boardId + '/update-title', { title: title });
	} catch (error) {
		dispatch(
			openAlert({
				message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
				severity: 'error',
			})
		);
	}
};



export const workspaceMemberAdd = async (workspaceId, members, dispatch) => {
	try {
		const result = await axios.post(`${workspaceRoute}/${workspaceId}/add-member`,{
			members
		});
		await dispatch(addMembers(result.data));
		dispatch(
			openAlert({
				message: 'Members are added to this workspace successfully',
				severity: 'success',
			})
		);
	} catch (error) {
		dispatch(
			openAlert({
				message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
				severity: 'error',
			})
		);
	}
};
