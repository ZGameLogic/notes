import {campaigns, record_types, users} from "@/generated/prisma/client";

async function fetchAllCampaigns(): Promise<campaigns[]> {
  if (!databaseService?.prisma) return [];
  return await databaseService.prisma.campaigns.findMany();
}

async function fetchAllUsers(): Promise<users[]> {
  if (!databaseService?.prisma) return [];
  return await databaseService.prisma.users.findMany();
}

async function fetchAllRecordTypes(): Promise<record_types[]> {
  if (!databaseService?.prisma) return [];
  return await databaseService.prisma.record_types.findMany();
}

export { fetchAllCampaigns, fetchAllUsers, fetchAllRecordTypes };