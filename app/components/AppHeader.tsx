'use client';

import {
  AppBar,
  Avatar,
  ButtonBase, Divider, FormControl, Grid,
  IconButton, InputAdornment, InputLabel,
  ListItemIcon,
  Menu,
  MenuItem, OutlinedInput, Paper, Select,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Logout, Search} from "@mui/icons-material";
import {useMemo, useState, type MouseEvent} from "react";
import { useRouter } from 'next/navigation';
import {useAuthData} from "@/app/components/auth/useAuthData";
import {useGlobalData} from "@/app/components/global/useGlobalData";

type AppHeaderProps = {
  redirect_url: string
  client_id: string
};

export default function AppHeader({ redirect_url, client_id }: AppHeaderProps){
  const router = useRouter();
  const { authData, logout } = useAuthData();

  const { selectedCampaignId, setSelectedCampaignId, campaigns } = useGlobalData();

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
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: '100%'
        }}
      >
        <Grid size={4}>
          <Stack direction={'row'} sx={{alignItems: 'center'}}>
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
            Dungeons and Dragons Notes
          </Typography>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "stretch",
              overflow: "hidden"
            }}
          >
            <OutlinedInput
              placeholder="Search"
              endAdornment={
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              }
              sx={{
                flex: 1,
                "& fieldset": { border: "none" },
              }}
            />
            <Divider orientation="vertical" flexItem />
            <FormControl>
              <InputLabel id={'camp_id'} />
              <Select
                variant="standard"
                disableUnderline
                value={selectedCampaignId ?? ""}
                onChange={(e) => setSelectedCampaignId(e.target.value)}
                sx={{
                  px: 2,
                  minWidth: 220,
                }}
              >
                {campaigns.map(camp => <MenuItem key={camp.id} value={camp.id}>{camp.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid
          size={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {authData ? <>
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
          </IconButton>
          }
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>;
}