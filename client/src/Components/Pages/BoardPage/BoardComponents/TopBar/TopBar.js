import React, { useEffect, useState } from 'react';
import * as style from './styled';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as common from '../../CommonStyled';
import { useDispatch, useSelector } from 'react-redux';
import { boardTitleUpdate } from '../../../../../Services/boardsService';
import RightDrawer from '../../../../Drawers/RightDrawer/RightDrawer';
import BasePopover from '../../../../Modals/EditCardModal/ReUsableComponents/BasePopover';
import InviteMembers from '../../../../Modals/EditCardModal/Popovers/InviteMembers/InviteMembers';
import { Button } from '@mui/material';
import { Deleteboard } from '../../../../../Services/boardsWorkspaceService';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
	const {id} = useParams();
	const board = useSelector((state) => state.board);
	const [currentTitle, setCurrentTitle] = useState(board.title);
	const [showDrawer,setShowDrawer] = useState(false);
	const [invitePopover, setInvitePopover] = React.useState(null);
	const dispatch = useDispatch();
	useEffect(()=>{
		if(!board.loading)
			setCurrentTitle(board.title);
	},[board.loading, board.title]);
	const handleTitleChange = () => {
		boardTitleUpdate(currentTitle,board.id,dispatch);
	};
	// useEffect ( ()=> {
	// 	Deleteboard(id, dispatch);
	// },[id,dispatch]);

	const navigate = useNavigate();
	const handleDeleteBoard = () => {
        if (window.confirm('Are you sure you want to delete this board?')) {
            Deleteboard(id, dispatch).then(() => {
				console.log("testing navigate");
				navigate(-1); 
			});;
        }
    };

	return (
		<style.TopBar>
			<style.LeftWrapper>
				<style.InviteButton onClick={(event) => setInvitePopover(event.currentTarget)}>
					<PersonAddAltIcon />
					<style.TextSpan>Add Member</style.TextSpan>
				</style.InviteButton>
				{invitePopover && (
				<BasePopover
					anchorElement={invitePopover}
					closeCallback={() => {
						setInvitePopover(null);
					}}
					title='Invite Members'
					contents={<InviteMembers closeCallback={() => {
						setInvitePopover(null);
					}}/>}
				/>
			)}

				<style.BoardNameInput
					placeholder='Board Name'
					value={currentTitle}
					onChange={(e) => setCurrentTitle(e.target.value)}
					onBlur={handleTitleChange}
				/>
			</style.LeftWrapper>

			<style.RightWrapper>
			<Button onClick={handleDeleteBoard} variant="contained" color="secondary">Delete Board</Button>
				<common.Button onClick={()=>{setShowDrawer(true)}}>
					<MoreHorizIcon />
					<style.TextSpan>Show menu</style.TextSpan>
				</common.Button>
			</style.RightWrapper>
			<RightDrawer show={showDrawer} closeCallback={()=>{setShowDrawer(false)}} />
		</style.TopBar>
	);
};

export default TopBar;
