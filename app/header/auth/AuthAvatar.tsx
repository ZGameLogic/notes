import { cookies } from "next/headers";
import {Avatar, Stack, Typography} from "@mui/material";

export default async function AuthAvatar(){
  const cookieStore = await cookies();
  const id = cookieStore.get("id")?.value;
  const username = cookieStore.get("username")?.value;
  const avatar = cookieStore.get("avatar")?.value;

  return <Stack direction={'row'} spacing={1} sx={{alignItems: 'center'}}>
    <Typography>{username}</Typography>
    <Avatar
      sx={{ width: 24, height: 24 }}
      src={`https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=56`}
    />
  </Stack>;
}