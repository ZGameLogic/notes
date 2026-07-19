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

async function saveUserAuthData(notes_token: string, dAuth: DiscordAuthenticationResponse, dUser: DiscordUserResponse){
  if(!databaseService?.prisma) throw new Error('Database service not initialized');

  await databaseService.prisma.users.upsert({
    where: { id: dUser.id },
    create: {
      id: dUser.id,
      username: dUser.username,
      avatar: dUser.avatar || null,
    },
    update: {
      username: dUser.username,
      avatar: dUser.avatar || null,
    },
  });

  return await databaseService.prisma.auth_data.upsert({
    where: { notes_token: notes_token },
    create: {
      notes_token,
      discord_refresh_token: dAuth.refresh_token,
      discord_token: dAuth.access_token,
      discord_token_expiration: new Date(Date.now() + (dAuth.expires_in * 1000)),
      discord_id: dUser.id
    },
    update: {
      discord_refresh_token: dAuth.refresh_token,
      discord_token: dAuth.access_token,
      discord_token_expiration: new Date(Date.now() + (dAuth.expires_in * 1000))
    }
  });
}

async function findByNotesToken(notes_token: string){
  if(!databaseService?.prisma) throw new Error('Database service not initialized');
  const data = await databaseService.prisma.auth_data.findFirst({
    where: { notes_token }
  });

  if(data === null) throw new Error(`No auth data found for notes_token: ${notes_token}`);
  return data;
}

async function deleteByNotesToken(notes_token: string){
  if(!databaseService?.prisma) throw new Error('Database service not initialized');
  await databaseService.prisma.auth_data.delete({
    where: {
      notes_token: notes_token
    }
  });
}

export { fetchExpiringDiscordTokens, findByNotesToken, saveUserAuthData, deleteByNotesToken }