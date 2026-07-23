'use server';

import {fetchAllCampaigns, fetchAllUsers} from "@/app/lib/database/GlobalDataRepository";
import {campaigns, users} from "@/generated/prisma/client";

export async function getAllUsers(): Promise<users[]>{
  try {
    return await fetchAllUsers();
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