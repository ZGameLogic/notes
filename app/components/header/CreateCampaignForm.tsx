'use client';

import {Dispatch, SetStateAction, SubmitEvent} from "react";
import {Box, Modal, TextField} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {fetchAllUsers} from "@/app/lib/database/GlobalDataRepository";

type CreateCampaignFormProps = {
  open: boolean
  setOpenAction: Dispatch<SetStateAction<boolean>>
}

export function CreateCampaignForm({open, setOpenAction}: CreateCampaignFormProps){
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
    refetchOnMount: 'always',
    retry: false,
    throwOnError: false
  });

  function submitForm(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(new FormData(event.currentTarget).get('name'))

    console.log(event.currentTarget);
  }

  return <Modal
    open={open}
    onClose={() => setOpenAction(false)}
  >
    <Box sx={{...style}} component={'form'} onSubmit={submitForm}>
      <TextField
        label={'Name'}
        sx={{ width: '100%' }}
      />
    </Box>
  </Modal>;
}