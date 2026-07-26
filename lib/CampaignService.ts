'use server';

import {authorizeWithNotesToken} from "@/lib/AuthenticationService";
import {createCampaignData} from "@/lib/database/CampaignDataRepository";

export async function createCampaign(name: string){
  const authData = await authorizeWithNotesToken();
  if(!authData) throw Error('Unauthorized');
  await createCampaignData(name, authData.id, new Date());
}