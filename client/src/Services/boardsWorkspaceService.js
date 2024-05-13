import axios from "axios";
import { openAlert } from "../Redux/Slices/alertSlice";
import {
  failFetchingBoards,
  startFetchingBoards,
  successFetchingBoards,
  successCreatingBoard,
  failCreatingBoard,
  startCreatingBoard,
} from "../Redux/Slices/boardsWorkspaceSlice";
import { addNewBoard } from "../Redux/Slices/userSlice";
import {setLoading, successFetchingBoard, updateTitle} from "../Redux/Slices/boardSlice";
const baseUrl = "http://localhost:3001/board";


export const getBoardsW = async (id, fromDropDown,dispatch) => {
 
  if(!fromDropDown)dispatch(startFetchingBoards());
  try {
    const res = await axios.get( `http://localhost:3001/boardw/${id}/get`);
    console.log("bords work",res);
    setTimeout(() => {
      dispatch(successFetchingBoards({ Wboards: res.data }));
    }, 1000);
   
  } catch (error) {
    dispatch(failFetchingBoards());
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const createBoard = async (id,props, dispatch) => {
  dispatch(startCreatingBoard());
  if (!(props.title && props.backgroundImageLink)) {
    dispatch(failCreatingBoard());
    dispatch(
      openAlert({
        message: "Please enter a title for board!",
        severity: "warning",
      })
    );
    return;
  }
  try {
    const res = await axios.post(`http://localhost:3001/boardw/${id}/create`,props);
    dispatch(addNewBoard(res.data));
    dispatch(successCreatingBoard(res.data));
    dispatch(
      openAlert({
        message: `${res.data.title} board has been successfully created`,
        severity: "success",
      })
    );
  } catch (error) {
    dispatch(failCreatingBoard());
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const getBoard = async (boardId,dispatch) => {
  dispatch(setLoading(true));
  try {
     const res = await axios.get(baseUrl + "/" + boardId);
    //const res = await axios.get("http://localhost:3001/boardw/663d66bc9ae603a6352ff40a/get"+ boardId);
      dispatch(successFetchingBoard(res.data));    
    setTimeout(() => {
      dispatch(setLoading(false));      
    }, 1000);
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const boardTitleUpdate = async (title, boardId, dispatch) => {
	try {
		dispatch(updateTitle(title));
		await axios.put(baseUrl + '/' + boardId + '/update-board-title', {title:title});
	} catch (error) {	
		dispatch(
			openAlert({
				message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
				severity: 'error',
			})
		);
	}


};