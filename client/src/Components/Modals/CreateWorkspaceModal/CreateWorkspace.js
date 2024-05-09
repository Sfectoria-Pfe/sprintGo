import * as React from "react";
import Modal from "@mui/material/Modal";
import * as style from "./Styled";

import PhotoCardComponent from "./PhotoCardComponent";
import TitleCardComponent from "./TitleCardComponent";
import { useDispatch, useSelector } from "react-redux";
import { createworkspace } from "../../../Services/workSpacesService";
import LoadingScreen from "../../LoadingScreen";

export default function CreateWorkspace(props) {
  const dispatch = useDispatch();
  const creating = useSelector((state) => state.workspaces.creating);
  const {  } = useSelector(
    (state) => state.workspaces
  );

  const [open, setOpen] = React.useState(true);

 

  let newworkspace = {};

  const handleClick = async () => {
    await createworkspace(newworkspace, dispatch);
    props.callback();
   
  };

 
  const handleClose = () => {
    setOpen(false);
    props.callback();
  };

  const handleUpdate = (updatedworkspace) => {
    newworkspace = { ...updatedworkspace };
  };

  return (
    <div style={{ position: "relative" }}>
      {creating && <LoadingScreen />}
      <Modal open={open} onClose={handleClose} disableEnforceFocus>
        <style.Container>
          <style.Wrapper>
            <TitleCardComponent
             
              updateback={handleUpdate}
              callback={handleClose}
            />
           
          </style.Wrapper>
          <style.CreateButton onClick={() => handleClick()}>
            Create Workspace
          </style.CreateButton>
        </style.Container>
      </Modal>
    </div>
  );
}
