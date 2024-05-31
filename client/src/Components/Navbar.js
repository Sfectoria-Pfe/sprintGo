import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import SearchBar from './SearchBar';
import ProfileBox from './ProfileBox';
import { xs } from '../BreakPoints';

const Container = styled.div`
	height: 3rem;
	width: 100%;
	background-color: rgba(28, 41, 66, 0.1);
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
		padding: '0.5rem 0rem',
	})}
	z-index: 9999;
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
	gap: 5px;
	justify-content: flex-end;
`;

const LogoContainer = styled.div`
	display: flex;
	align-items: center;
`;

const SfectoriaLogo = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color:#02294F;
	cursor: pointer;
	padding-right :170px;
`;

const DropdownContainer = styled.div`
   
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	padding-left: 500px;
	${xs({
		display: 'none',
	})}
	background-color: rgba(28, 41, 66, 0.1);
	border-radius: 8px;
	padding-left: 2rem;
`;

const Navbar = (props) => {
	const [openModal, setOpenModal] = useState(false);
	const navigate = useNavigate();

	const handleModalClose = () => {
		setOpenModal(false);
	};

	return (
		<Container>
			<LeftSide>
				{/* <img
					src={sprintGo}
					onClick={() => window.scrollTo(0, 0)}
					style={{ width: '100px', height: '100px', cursor: 'pointer' }}
					alt="SprintGo Logo"
				/> */}
				<SfectoriaLogo onClick={() => navigate('/')}>SprintGo</SfectoriaLogo>
				<DropdownContainer>
					<DropdownMenu title='Your WorkSpaces' />
				</DropdownContainer>
			</LeftSide>
			<RightSide>
				<SearchBar searchString={props.searchString} setSearchString={props.setSearchString} />
				<ProfileBox />
			</RightSide>
		</Container>
	);
};

export default Navbar;
