'use client';

import {Typography} from "@mui/material";
import {use} from "react";

export default function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return <Typography>{id}</Typography>;
}