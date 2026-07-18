import {auth_data} from "@/generated/prisma/client";
import {DiscordAuthenticationResponse, DiscordUserResponse} from "@/app/lib/DiscordService";

async function fetchExpiringDiscordTokens(): Promise<auth_data[]> {
  if (!databaseService?.prisma) return [];
  const horizon = new Date(Date.now() + 10 * 60 * 1000);

  return await databaseService.prisma.auth_data.findMany({
    where: {
      discord_token_expiration: {
        lt: horizon
      }
    },
    orderBy: { discord_token_expiration: 'asc' }
  });
}

async function createUserAuthData(notes_token: string, dAuth: DiscordAuthenticationResponse, dUser: DiscordUserResponse){
  // TODO db service and prisma check

  const data: auth_data = {
    notes_token,
    discord_refresh_token: dAuth.refresh_token,
    discord_token: dAuth.access_token,
    discord_token_expiration: new Date(`${dAuth.expires_in}`),
    discord_id: dUser.id
  };

  const newAuthData =  databaseService?.prisma?.auth_data.create(data);
}

function updateExpiredToken(data: auth_data){

}

export { fetchExpiringDiscordTokens, updateExpiredToken }