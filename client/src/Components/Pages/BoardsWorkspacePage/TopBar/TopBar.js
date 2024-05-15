import React, { useEffect, useState } from 'react';
import * as style from './styled';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as common from '../../BoardPage/CommonStyled';
import { useDispatch, useSelector } from 'react-redux';
import { Deleteworkspace, workspaceTitleUpdate } from '../../../../Services/workspaceService';
import RightDrawer from '../../../Drawers/RightDrawer/RightDrawer';
import BasePopover from '../../../Modals/EditCardModal/ReUsableComponents/BasePopover';
import InviteMembers from '../../../Modals/EditCardModal/Popovers/InviteMembers/inviteMembersWorkspace';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';


const TopBar = () => {
	
	const {id} = useParams();
	const workspace = useSelector((state) => state.workspace);
	const [currentTitle, setCurrentTitle] = useState(workspace.title);
	const [showDrawer,setShowDrawer] = useState(false);
	const [invitePopover, setInvitePopover] = React.useState(null);
	const dispatch = useDispatch();
	useEffect(()=>{
		if(!workspace.loading)
			setCurrentTitle(workspace.title);
	},[workspace.loading, workspace.title]);
	const handleTitleChange = () => {
		workspaceTitleUpdate(currentTitle,workspace.id,dispatch);
	};
	const navigate = useNavigate();
	const handleDeleteworkspace = () => {
        if (window.confirm('Are you sure you want to delete this board?')) {
            Deleteworkspace(id, dispatch).then(() => {
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
					placeholder='Workspace Name'
					value={currentTitle}
					onChange={(e) => setCurrentTitle(e.target.value)}
					onBlur={handleTitleChange}
				/>
			</style.LeftWrapper>

			<style.RightWrapper>
			<Button onClick={handleDeleteworkspace} variant="contained" color="error">Delete Workspace</Button>

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
