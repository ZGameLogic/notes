'use client';

import {Avatar, ButtonBase, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography} from "@mui/material";
import {MouseEvent, useMemo, useState} from "react";
import {Logout} from "@mui/icons-material";
import {useRouter} from "next/navigation";
import {useAuthData} from "@/app/components/auth/useAuthData";

type AuthWidgetProps = {
  redirect_url: string
  client_id: string
};

export default function AuthWidget({ redirect_url, client_id }: AuthWidgetProps){
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

  return authData ? <>
    <ButtonBase
      onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
      sx={{ p: '1%' }}
    >
      <Stack direction={'row'} spacing={1} sx={{alignItems: 'center'}}>
        <Typography>{authData.username}</Typography>
        <Avatar
          sx={{ width: 24, height: 24 }}
          src={`https://cdn.discordapp.com/avatars/${authData.id}/${authData.avatar}.png?size=56`}
        />
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
    <Avatar sx={{ width: 24, height: 24 }} />
  </IconButton>;
}