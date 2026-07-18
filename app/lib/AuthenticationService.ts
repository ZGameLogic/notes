'use server';

import {fetchExpiringDiscordTokens} from "@/app/lib/database/AuthDataRepository";
import {authorizeWithDiscordCode, getDiscordUserFromDiscordToken} from "@/app/lib/DiscordService";

type AuthenticationData = {
  notes_token: string
  id: bigint
  username: string
  avatar: string
}

export async function refreshExpiredTokens() {
  fetchExpiringDiscordTokens().then(expiringTokens => expiringTokens.forEach(expiredToken => {

  }));
}

export async function authorizeWithCode(code: string, redirectUrl: string): Promise<AuthenticationData> {
  const dAuth = await authorizeWithDiscordCode(code, redirectUrl);
  const dUser = await getDiscordUserFromDiscordToken(dAuth.access_token);
  const notes_token = crypto.randomUUID().replace('-', '');



  return {
    notes_token,
    id: dUser.id,
    username: dUser.username,
    avatar: dUser.avatar
  };
}

export async function test(){
}