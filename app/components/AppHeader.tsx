'use client';

import {
  AppBar,
  Avatar,
  ButtonBase,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {AccountCircle, Logout} from "@mui/icons-material";
import {useMemo, useState, type MouseEvent} from "react";
import { useRouter } from 'next/navigation';
import {useAuthData} from "@/app/components/auth/useAuthData";

type AppHeaderProps = {
  redirect_url: string
  client_id: string
};

export default function AppHeader({ redirect_url, client_id }: AppHeaderProps){
  const router = useRouter();
  const { authData, logout } = useAuthData();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const loginLink = useMemo(() => {
    const url = new URL(`https://discord.com/oauth2/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_url}&scope=identify`);
    return url.toString();
  }, [client_id, redirect_url]);

  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleClose();
  };

  return <AppBar position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Dungeons and Dragons notes
      </Typography>
      {authData ? <>
        <ButtonBase onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}>
          <Stack direction={'row'} spacing={1} sx={{alignItems: 'center'}}>
            <Typography>{authData.username}</Typography>
            <Avatar src={`https://cdn.discordapp.com/avatars/${authData.id}/${authData.avatar}.png?size=56`}/>
          </Stack>
        </ButtonBase>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </> : <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => router.push(loginLink)}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      }
    </Toolbar>
  </AppBar>;
}