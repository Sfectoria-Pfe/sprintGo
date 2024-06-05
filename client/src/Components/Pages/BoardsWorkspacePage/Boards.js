
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoardsW } from "../../../Services/boardsWorkspaceService";
import Navbar from "../../Navbar";
import { Container, Wrapper, Title, Board, AddBoard } from "./Styled";

import Sidebar from "../../sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../LoadingScreen";
import CreateBoard from "../../Modals/CreateBoardModal/CreateBoard";
import { useParams } from 'react-router-dom';
import Topbar from "./TopBar/TopBar"


const BoardsW = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const { pending, WboardsData } = useSelector((state) => state.Wboards) ;
  
  const [searchString, setSearchString] = useState('');

 

  const handleClick = (e) => {
  navigate(`/board/${e.target.id}`)
  }

  useEffect(() => {
    getBoardsW(id,false,dispatch);
  }, [id,dispatch]);

  useEffect(() => {
    document.title = "Boards | SprintGo"
  }, [])


  const handleModalClose = () => {
    setOpenModal(false);
  };
  const [openModal, setOpenModal] = useState(false);


  const userInfo = useSelector((state) => state.user.userInfo);
	// const boardsData = useSelector((state) => state.boards.boardsData)
	// const isOwner = boardsData.some(board => {
	// 	return board.members.some(member => member.user === userInfo._id && member.role === 'owner');
	//   });

  return (
    <>
      {pending && <LoadingScreen />}
      <Container  >        
     

        <Navbar  searchString={searchString} setSearchString={setSearchString} />
      
        <Wrapper>
        {/* {isOwner && <Topbar /> } */}
        <Topbar />
          <Title>Your Boards</Title>
          
        
          {!pending &&
            WboardsData.length>0 &&
            WboardsData.filter(item=>searchString?item.title.toLowerCase().includes(searchString.toLowerCase()):true).map((item) => {
              return (
                <Board key={item._id} link={item.backgroundImageLink} isImage={item.isImage} id={item._id} onClick={(e)=>handleClick(e)}>
                  {item.title}
                </Board>
              );
            })}
           
         
           {!pending && (
            <AddBoard onClick={() => setOpenModal(true)}>
              Create new Board
            </AddBoard>
          )}
          {openModal && <CreateBoard callback={handleModalClose} />}
        
        
        </Wrapper>
       
      </Container>
    </>
  );
};

export default BoardsW;
