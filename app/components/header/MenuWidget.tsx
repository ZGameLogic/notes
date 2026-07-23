'use client';

import MenuIcon from "@mui/icons-material/Menu";
import {Box, IconButton, ListItemIcon, Menu, MenuItem, Modal, Typography} from "@mui/material";
import {MouseEvent, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';

export function MenuWidget(){
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [createCampaignOpen, setCreateCampaignOpen] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return <>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem>
        <ListItemIcon> <AddIcon /> </ListItemIcon>
        Create Record
      </MenuItem>
      <MenuItem>
        <ListItemIcon> <AssignmentIcon /> </ListItemIcon>
        My Campaigns
      </MenuItem>
      <MenuItem onClick={() => {
        setAnchorEl(null);
        setCreateCampaignOpen(true)
      }}>
        <ListItemIcon> <AddIcon /> </ListItemIcon>
        Create Campaign
      </MenuItem>
    </Menu>
    <Modal
      open={createCampaignOpen}
      onClose={() => setCreateCampaignOpen(false)}
    >
      <Box sx={{...style}}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  </>;
}