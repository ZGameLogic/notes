'use server';

import {fetchAllCampaigns, fetchAllUser} from "@/app/lib/database/GlobalDataRepository";
import {campaigns, users} from "@/generated/prisma/client";

export async function getAllUsers(): Promise<users[]>{
  try {
    return await fetchAllUser();
  } catch {
    return [];
  }
}

export async function getAllCampaigns(): Promise<campaigns[]>{
  try {
    return await fetchAllCampaigns();
  } catch {
    return [];
  }
}