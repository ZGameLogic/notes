'use server';

import {fetchExpiringDiscordTokens, findByNotesToken, saveUserAuthData, deleteByNotesToken} from "@/app/lib/database/AuthDataRepository";
import {
  authorizeWithDiscordCode,
  authorizeWithDiscordRefreshToken,
  getDiscordUserFromDiscordToken,
  revokeToken
} from "@/app/lib/DiscordService";
import { cookies } from 'next/headers';

export type AuthenticationData = {
  id: string
  username: string
  avatar: string
}

export async function refreshExpiredTokens() {
  fetchExpiringDiscordTokens().then(expiringTokens => expiringTokens.forEach(expiredToken => {
    authorizeWithDiscordRefreshToken(expiredToken.discord_refresh_token).then(async dAuth => {
      const dUser = await getDiscordUserFromDiscordToken(dAuth.access_token);
      await saveUserAuthData(expiredToken.notes_token, dAuth, dUser);
    }).catch(err => console.error('Unable to refresh token', err));
  }));
}

export async function authorizeWithCode(code: string): Promise<AuthenticationData> {
  const dAuth = await authorizeWithDiscordCode(code);
  const dUser = await getDiscordUserFromDiscordToken(dAuth.access_token);
  const notes_token = crypto.randomUUID().replaceAll('-', '');
  const savedData = await saveUserAuthData(notes_token, dAuth, dUser);

  (await cookies()).set({
    name: 'notes_token',
    value: notes_token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 2147483647
  });

  return {
    id: BigInt(savedData.discord_id).toString(),
    username: dUser.username,
    avatar: dUser.avatar
  };
}

export async function authorizeWithNotesToken(): Promise<AuthenticationData | undefined> {
  const notes_token = (await cookies()).get('notes_token')?.value;
  if (!notes_token) throw new Error('No token found on cookie data');
  const authData = await findByNotesToken(notes_token);
  const userData = await getDiscordUserFromDiscordToken(authData.discord_token);

  return {
    id: BigInt(authData.discord_id).toString(),
    username: userData.username,
    avatar: userData.avatar
  };
}

export async function logout() {
  const notes_token = (await cookies()).get('notes_token')?.value;
  if(!notes_token) throw new Error('No token found on cookie data');
  const authData =  await findByNotesToken(notes_token);
  await revokeToken(authData.discord_token);
  await deleteByNotesToken(notes_token);

  (await cookies()).set({
    name: 'notes_token',
    value: notes_token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0
  });
}