'use server';

import {fetchAllCampaigns, fetchAllRecordTypes, fetchAllUsers} from "@/lib/database/GlobalDataRepository";
import {campaigns, record_types, users} from "@/generated/prisma/client";

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

export async function getAllRecordTypes(): Promise<record_types[]>{
  try {
    return await fetchAllRecordTypes();
  } catch {
    return [];
  }
}