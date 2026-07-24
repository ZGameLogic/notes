export async function createCampaignData(name: string, owner: string, created_ts: Date) {
  if(!databaseService?.prisma) throw new Error('Database service not initialized');
  const campaign = await databaseService.prisma.campaigns.create({
    data: {
      id: crypto.randomUUID(),
      name,
      created: created_ts
    }
  });

  const campPlayer = await databaseService.prisma.campaign_players.create({
    data: {
      user_id: BigInt(owner),
      campaign_id: campaign.id,
      role: 'owner'
    }
  });

  await databaseService.prisma.events.create({
    data: {
      event_id: crypto.randomUUID(),
      user_id: BigInt(owner),
      time: created_ts,
      action: 'create',
      record_id: campaign.id,
      details: campaign
    }
  });

  await databaseService.prisma.events.create({
    data: {
      event_id: crypto.randomUUID(),
      user_id: BigInt(owner),
      time: created_ts,
      action: 'add',
      record_id: campaign.id,
      details: {
        ...campPlayer,
        user_id: campPlayer.user_id.toString()
      }
    }
  });

  return campaign;
}