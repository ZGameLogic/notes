'use client';

import {createContext} from 'react';
import {AuthenticationData} from "@/app/lib/AuthenticationService";

export type AuthDataContext = {
  authData?: AuthenticationData;
  logout: () => void;
}

export const AuthDataContext = createContext<AuthDataContext>({
  authData: undefined,
  logout: () => {}
});