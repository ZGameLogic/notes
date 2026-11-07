'use client';

import {useQuery} from "@tanstack/react-query";
import {getAllRecordTypes} from "@/lib/GlobalDataService";

export function CreateRecordForm(){
  const { data: recordTypes } = useQuery({
    queryKey: ['recordTypes'],
    queryFn: getAllRecordTypes,
    refetchOnMount: 'always',
    retry: false,
    throwOnError: false
  });

  return <></>;
}