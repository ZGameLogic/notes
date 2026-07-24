'use server';

import {createCampaignData} from "@/app/lib/database/CampaignDataRepository";

export async function createCampaign(name: string, owner: string){
  await createCampaignData(name, owner, new Date());
}