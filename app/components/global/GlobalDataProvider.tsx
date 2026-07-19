'use client';

import {PropsWithChildren, useEffect, useState} from "react";
import {GlobalDataContext} from "@/app/components/global/GlobalDataContext";
import {campaigns} from "@/generated/prisma/client";
import {getAllCampaigns} from "@/app/lib/GlobalDataService";

export function GlobalDataProvider({ children }: PropsWithChildren){
  const [selectedCampaign, setSelectedCampaign] = useState<string | undefined>(undefined);
  const [campaigns, setCampaigns] = useState<campaigns[]>([]);

  useEffect(() => {
    const id = typeof window !== 'undefined' ? localStorage.getItem('camp_id') : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if(id) setSelectedCampaign(id);

    getAllCampaigns().then(data => {
      setCampaigns(data);
    }).catch();
  }, []);

  useEffect(() => {
    if(selectedCampaign && selectedCampaign !== '') {
      localStorage.setItem('camp_id', selectedCampaign);
    } else {
      localStorage.removeItem('camp_id')
    }
  }, [selectedCampaign])
  
  useEffect(() => {
    if(!selectedCampaign) return;
    if(campaigns.length === 0) return;
    if(campaigns.map(c => c.id).includes(selectedCampaign)) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedCampaign(undefined);
  }, [campaigns, selectedCampaign]);

  return <GlobalDataContext.Provider value={{
    selectedCampaignId: selectedCampaign,
    setSelectedCampaignId: setSelectedCampaign,
    campaigns: campaigns
  }}>{children}</GlobalDataContext.Provider>;
}