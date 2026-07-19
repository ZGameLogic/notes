import {campaigns} from "@/generated/prisma/client";

async function fetchAllCampaigns(): Promise<campaigns[]> {
  if (!databaseService?.prisma) return [];
  return await databaseService.prisma.campaigns.findMany();
}

export { fetchAllCampaigns };