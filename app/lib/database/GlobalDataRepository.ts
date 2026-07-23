import {campaigns, users} from "@/generated/prisma/client";

async function fetchAllCampaigns(): Promise<campaigns[]> {
  if (!databaseService?.prisma) return [];
  return await databaseService.prisma.campaigns.findMany();
}

async function fetchAllUsers(): Promise<users[]> {
  if (!databaseService?.prisma) return [];
  return await databaseService.prisma.users.findMany();
}

export { fetchAllCampaigns, fetchAllUsers };