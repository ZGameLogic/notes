'use client';

import {PropsWithChildren, useCallback, useEffect, useMemo, useState} from "react";
import {AuthDataContext} from "@/app/components/auth/AuthDataContext";
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import {AuthenticationData, authorizeWithCode, authorizeWithNotesToken, logout as revokeLogin} from "@/app/lib/AuthenticationService";

export function AuthDataProvider({ children }: PropsWithChildren){
  const code = useSearchParams().get('code');
  const pathName = usePathname();
  const router = useRouter();
  const [serverAuthData, setServerAuthData] = useState<AuthenticationData | undefined>(undefined);
  const [localAuthData, setLocalAuthData] = useState<AuthenticationData | undefined>(undefined);

  const authData: AuthenticationData | undefined = useMemo(() => {
    if(serverAuthData){
      return serverAuthData;
    } else if(localAuthData){
      return localAuthData;
    } else {
      return undefined;
    }
  }, [serverAuthData, localAuthData]);

  useEffect(() => {
    const id = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
    const username = typeof window !== 'undefined' ? localStorage.getItem('user_name') : null;
    const avatar = typeof window !== 'undefined' ? localStorage.getItem('user_avatar') : null;

    if(id && username && avatar) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalAuthData({ id, avatar, username, notes_token: '' });
    }

    if(code === null) return;
    authorizeWithCode(code).then(authData => {
      setServerAuthData(authData);
      router.push(pathName);
    }).catch(() => {});
  }, [code, pathName, router]);

  useEffect(() => {
    authorizeWithNotesToken().then(authData => {
      setServerAuthData(authData);
      router.replace(pathName);
    }).catch(() => {});
  }, [pathName, router]);

  useEffect(() => {
    if(serverAuthData){
      window.localStorage.setItem('user_id', serverAuthData.id);
      window.localStorage.setItem('user_name', serverAuthData.username);
      window.localStorage.setItem('user_avatar', serverAuthData.avatar);
    } else {
      window.localStorage.removeItem('user_id');
      window.localStorage.removeItem('user_name');
      window.localStorage.removeItem('user_avatar');
    }
  }, [serverAuthData]);

  const logout = useCallback(() => {
    revokeLogin().then(() => {
      window.localStorage.removeItem('user_id');
      window.localStorage.removeItem('user_name');
      window.localStorage.removeItem('user_avatar');
      setLocalAuthData(undefined);
      setServerAuthData(undefined);
    });
  }, []);

  return <AuthDataContext.Provider value={{
    authData,
    logout
  }}>{children}</AuthDataContext.Provider>;
}