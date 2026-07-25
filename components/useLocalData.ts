import {Dispatch, SetStateAction, useEffect, useState} from "react";

export default function useLocalData<T>(key: string, initialValue?: T): [T | undefined, Dispatch<SetStateAction<T | undefined>>]{
  const [value, setValue] = useState<T | undefined>(initialValue);

  useEffect(() => {
    if(!window.localStorage) return;
    const v = window.localStorage.getItem(key);
    if(v === null) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(JSON.parse(v));
  }, []);
  
  useEffect(() => {
    if(!window.localStorage) return;
    if(value !== null && value !== undefined) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(key);
    }
  }, [key, value]);

  return [value, setValue];
};