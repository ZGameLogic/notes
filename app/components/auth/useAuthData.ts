'use client';

import {useContext} from "react";
import {AuthDataContext} from "@/app/components/auth/AuthDataContext";

export function useAuthData() {
  return useContext(AuthDataContext);
}