
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkspaces } from "../../../Services/workSpacesService";
import Navbar from "../../Navbar";
import { Container, Wrapper, Title, Workspace, AddWorkspace } from "./Styled";

import Sidebar from "../../sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../LoadingScreen";
import CreateWorkspace from "../../Modals/CreateWorkspaceModal/CreateWorkspace";

const Workspaces = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  console.log("this is workspace eedata");
  const { pending, workspacesData } = useSelector((state) => state.workspaces || { pending: false, workspacesData: [] });
  // const { pending, workspacesData } = useSelector((state) => state.workspacesData);
  console.log(workspacesData, "this is workspace data");
  const [searchString, setSearchString] = useState('');


  const handleClick = (e) => {
  navigate(`/Workspace/${e.target.id}`)
  }

  useEffect(() => {
    getWorkspaces(false,dispatch);
  }, [dispatch]);

  useEffect(() => {
    document.title = "Workspaces | SprintGo"
  }, [])
  const handleModalClose = () => {
    setOpenModal(false);
  };
  const [openModal, setOpenModal] = useState(false);


  return (
    <>
      {pending && <LoadingScreen />}
      <Container  >        
     

        <Navbar  searchString={searchString} setSearchString={setSearchString} />
        <Wrapper>
       
          <Title>Your Workspaces</Title>
        
          {!pending &&
            workspacesData.length>0 &&
            workspacesData.filter(item=>searchString?item.title.toLowerCase().includes(searchString.toLowerCase()):true).map((item) => {
              return (
                <Workspace key={item._id}  id={item._id} onClick={(e)=>handleClick(e)}>
                  {item.title}
                </Workspace>
              );
            })}
           
           {!pending && (
            <AddWorkspace onClick={() => setOpenModal(true)}>
              Create new Workspace
            </AddWorkspace>
          )}
          {openModal && <CreateWorkspace callback={handleModalClose} />}
        
        </Wrapper>
       
      </Container>
    </>
  );
};

export default Workspaces;
