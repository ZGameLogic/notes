import {campaigns, users} from "@/generated/prisma/client";

async function fetchAllCampaigns(): Promise<campaigns[]> {
  if (!databaseService?.prisma) return [];
  return await databaseService.prisma.campaigns.findMany();
}

async function fetchAllUser(): Promise<users[]> {
  if (!databaseService?.prisma) return [];
  return await databaseService.prisma.users.findMany();
}

export { fetchAllCampaigns, fetchAllUser };