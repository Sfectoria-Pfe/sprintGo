import React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import AvatarWithStatus from './AvatarWithStatus';
import { toggleMessagesPane } from './utils';

export default function ChatListItem(props) {
  const { _id, members, selectedChatId, setSelectedChat } = props;
  const selected = selectedChatId === _id;

  const handleListItemClick = () => {
    toggleMessagesPane();
    setSelectedChat({ _id, members });
  };

  return (
    <>
      <ListItem>
        <ListItemButton
          onClick={handleListItemClick}
          selected={selected}
          color="neutral"
          sx={{
            flexDirection: 'column',
            alignItems: 'initial',
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus  src="/static/images/avatar/2.jpg" />
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{members[0]?.name}</Typography>
              
            </Box>
         
          </Stack>
         
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </>
  );
}
