'use server';

import {fetchExpiringDiscordTokens, saveUserAuthData} from "@/app/lib/database/AuthDataRepository";
import {
  authorizeWithDiscordCode,
  authorizeWithDiscordRefreshToken,
  getDiscordUserFromDiscordToken
} from "@/app/lib/DiscordService";

type AuthenticationData = {
  notes_token: string
  id: bigint
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

export async function authorizeWithCode(code: string, redirectUrl: string): Promise<AuthenticationData> {
  const dAuth = await authorizeWithDiscordCode(code, redirectUrl);
  const dUser = await getDiscordUserFromDiscordToken(dAuth.access_token);
  const notes_token = crypto.randomUUID().replace('-', '');
  const savedData = await saveUserAuthData(notes_token, dAuth, dUser);

  return {
    notes_token: savedData.notes_token,
    id: savedData.discord_id,
    username: dUser.username,
    avatar: dUser.avatar
  };
}

export async function test(){
}