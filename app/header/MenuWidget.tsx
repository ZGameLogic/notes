'use client';

import MenuIcon from "@mui/icons-material/Menu";
import {IconButton, ListItemIcon, Menu, MenuItem} from "@mui/material";
import {MouseEvent, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {CreateCampaignForm} from "@/app/header/CreateCampaignForm";
import {useQuery} from "@tanstack/react-query";
import {authorizeWithNotesToken} from "@/lib/AuthenticationService";

export function MenuWidget(){
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [createCampaignOpen, setCreateCampaignOpen] = useState(false);

  const { data: authData } = useQuery({
    queryKey: ['auth'],
    queryFn: authorizeWithNotesToken,
    retry: false,
    throwOnError: false
  });

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
      <MenuItem
        disabled={!authData}
        onClick={() => {
          setAnchorEl(null);
          setCreateCampaignOpen(true)
        }}
      >
        <ListItemIcon> <AddIcon /> </ListItemIcon>
        Create Campaign
      </MenuItem>
    </Menu>
    <CreateCampaignForm open={createCampaignOpen} setOpenAction={setCreateCampaignOpen} />
  </>;
}