'use server';

import {fetchAllCampaigns} from "@/app/lib/database/CampaignRepository";
import {campaigns} from "@/generated/prisma/client";

export async function getAllCampaigns(): Promise<campaigns[]>{
  try {
    return await fetchAllCampaigns();
  } catch {
    return [];
  }
}