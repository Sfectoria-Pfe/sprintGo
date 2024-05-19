import axios from "axios";
import { openAlert } from "../Redux/Slices/alertSlice";
import {
  failFetchingworkspaces,
  startFetchingworkspaces,
  successFetchingworkspaces,
  successCreatingworkspace,
  failCreatingworkspace,
  startCreatingworkspace,
} from "../Redux/Slices/workspacesSlice";
import { addNewworkspace } from "../Redux/Slices/userSlice";
import {setLoading, successCreatingworkspace as successCreatingworkspacew,successFetchingworkspace, updateTitle} from "../Redux/Slices/workspaceSlice";
const baseUrl = "http://localhost:3001/workspace";

export const getWorkspaces = async (fromDropDown,dispatch) => {
  if(!fromDropDown)dispatch(startFetchingworkspaces());
  try {
    const res = await axios.get(baseUrl + "/");
    setTimeout(() => {
      dispatch(successFetchingworkspaces({ workspaces: res.data }));
    }, 1000);
  } catch (error) {
    dispatch(failFetchingworkspaces());
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

export const createworkspace = async (props, dispatch) => {
  dispatch(startCreatingworkspace());
  if (!(props.title )) {
    dispatch(failCreatingworkspace());
    dispatch(
      openAlert({
        message: "Please enter a title for workspace!",
        severity: "warning",
      })
    );
    return;
  }
  try {
    const res = await axios.post(baseUrl + "/create", props);
    dispatch(addNewworkspace(res.data));
    dispatch(successCreatingworkspace(res.data));
    dispatch(
      openAlert({
        message: `${res.data.title} workspace has been successfully created`,
        severity: "success",
      })
    );
  } catch (error) {
    dispatch(failCreatingworkspace());
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

export const getworkspace = async (workspaceId,dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(baseUrl + "/" + workspaceId);
      dispatch(successFetchingworkspace(res.data));    
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

export const workspaceTitleUpdate = async (title, workspaceId, dispatch) => {
	try {
		dispatch(updateTitle(title));
		await axios.put(baseUrl + '/' + workspaceId + '/update-workspace-title', {title:title});
	} catch (error) {	
		dispatch(
			openAlert({
				message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
				severity: 'error',
			})
		);
	}


};