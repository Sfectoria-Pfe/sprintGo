import React, { useState } from 'react';
import styled from 'styled-components';
import DropdownMenu from './DropdownMenu';
import SearchBar from './SearchBar';
import { xs } from '../BreakPoints';
import ProfileBox from './ProfileBox';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar/sidebar';
import CreateBoard from './Modals/CreateBoardModal/CreateBoard';

const Container = styled.div`
	height: 3rem;
	width: 100%;
	background-color: #4C5967;
	backdrop-filter: blur(24px);
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 1rem;
	gap: 0.5rem;
	${xs({
		padding: '0.5rem, 0rem',
	})}
`;

const LeftSide = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	gap: 1rem;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	${xs({
		gap: '0.1rem',
		width: 'fit-content',
	})}
`;

const RightSide = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap:5px;
	justify-content: flex-end;
`;

const LogoContainer = styled.div`
	display: flex;
	align-items: center;
`;

const TrelloLogo = styled.img`
	width: 75px;
	height: 15px;
	cursor: pointer;
`;

const DropdownContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	${xs({
		display: 'none',
	})}
`;

const Navbar = (props) => {
	const [openModal, setOpenModal] = useState(false);
	const navigate = useNavigate();
	const handleModalClose = () => {
		setOpenModal(false);
	  };

	return (
		<Container style={{zIndex:9999,position:"fixed",width:"100%"}}>
			<LeftSide>
				<LogoContainer>
					<TrelloLogo
						onClick={() => {
							navigate('/');
						}}
						src='https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif'
					/>
				</LogoContainer>
				<DropdownContainer style={{paddingLeft:"150px"}}>
					<DropdownMenu title='Your WorkSpaces' />
					
				</DropdownContainer>
			</LeftSide>
			<RightSide>
				<button className='btn btn-danger ' onClick={() => setOpenModal(true)}>Create</button>
				<SearchBar searchString={props.searchString} setSearchString={props.setSearchString} />
				<ProfileBox />
			</RightSide>
			{openModal && <CreateBoard callback={handleModalClose} />}
		</Container>
		
	);
};

export default Navbar;
