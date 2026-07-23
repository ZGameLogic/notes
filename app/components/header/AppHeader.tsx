'use client';

import {
  AppBar,
  Grid,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import SearchBar from "@/app/components/header/search/SearchBar";
import AuthWidget from "@/app/components/header/AuthWidget";
import {MenuWidget} from "@/app/components/header/MenuWidget";

type AppHeaderProps = {
  redirect_url: string
  client_id: string
};

export default function AppHeader({ redirect_url, client_id }: AppHeaderProps){

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
        <Grid size={2}>
          <Stack direction={'row'} sx={{alignItems: 'center'}}>
          <MenuWidget />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DnD Notes
          </Typography>
          </Stack>
        </Grid>
        <Grid size={6}>
          <SearchBar />
        </Grid>
        <Grid
          size={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <AuthWidget client_id={client_id} redirect_url={redirect_url} />
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>;
}