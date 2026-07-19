'use client';

import {createContext, Dispatch, SetStateAction} from "react";
import {campaigns} from "@/generated/prisma/client";

export type GlobalDataContext = {
  selectedCampaignId: string | undefined
  setSelectedCampaignId:  Dispatch<SetStateAction<string | undefined>>
  campaigns: campaigns[]
}

export const GlobalDataContext = createContext<GlobalDataContext>({
  selectedCampaignId: undefined,
  setSelectedCampaignId: () => {},
  campaigns: []
});