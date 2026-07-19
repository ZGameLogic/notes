'use client';

import {PropsWithChildren, useEffect, useState} from "react";
import {GlobalDataContext} from "@/app/components/global/GlobalDataContext";
import {campaigns} from "@/generated/prisma/client";
import {getAllCampaigns} from "@/app/lib/GlobalDataService";

export function GlobalDataProvider({ children }: PropsWithChildren){
  const [selectedCampaign, setSelectedCampaign] = useState<string | undefined>(undefined);
  const [campaigns, setCampaigns] = useState<campaigns[]>([]);

  useEffect(() => {
    getAllCampaigns().then(data => {
      setCampaigns(data);
    }).catch();
  }, []);

  return <GlobalDataContext.Provider value={{
    selectedCampaignId: selectedCampaign,
    setSelectedCampaignId: setSelectedCampaign,
    campaigns: campaigns
  }}>{children}</GlobalDataContext.Provider>;
}