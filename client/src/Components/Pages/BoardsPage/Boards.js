import LoadingScreen from "../../LoadingScreen";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "../../../Services/boardsService";
import Navbar from "../../Navbar";
import { Container, Wrapper, Title, Board, AddBoard } from "./Styled";
import CreateBoard from "../../Modals/CreateBoardModal/CreateBoard";
import Sidebar from "../../sidebar/sidebar";
import { useNavigate } from "react-router-dom";


const Boards = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { pending, boardsData } = useSelector((state) => state.boards);
  
  const [searchString, setSearchString] = useState('');


  const handleClick = (e) => {
  navigate(`/board/${e.target.id}`)
  }

  useEffect(() => {
    getBoards(false,dispatch);
  }, [dispatch]);

  useEffect(() => {
    document.title = "Boards | SprintGo"
  }, [])

  return (
    <>
      {pending && <LoadingScreen />}
      <Container  >        
     

        <Navbar  searchString={searchString} setSearchString={setSearchString} />
        <Wrapper>
       
          <Title>Your Boards</Title>
        
          {!pending &&
            boardsData.length>0 &&
            boardsData.filter(item=>searchString?item.title.toLowerCase().includes(searchString.toLowerCase()):true).map((item) => {
              return (
                <Board key={item._id} link={item.backgroundImageLink} isImage={item.isImage} id={item._id} onClick={(e)=>handleClick(e)}>
                  {item.title}
                </Board>
              );
            })}
           
        
        
        </Wrapper>
       
      </Container>
    </>
  );
};

export default Boards;
