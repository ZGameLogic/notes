'use client';

import {useContext} from "react";
import {GlobalDataContext} from "@/app/components/global/GlobalDataContext";

export function useGlobalData(){
  return useContext(GlobalDataContext);
}