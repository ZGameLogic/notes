'use client';

import { Dispatch, SetStateAction } from "react";
import { Box, Modal, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "@/app/lib/database/GlobalDataRepository";
import { useForm, Controller } from "react-hook-form";

type CreateCampaignFormProps = {
  open: boolean
  setOpenAction: Dispatch<SetStateAction<boolean>>
}

type CreateCampaignFormData = {
  name: string
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

  const { control, handleSubmit } = useForm<CreateCampaignFormData>({
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
    refetchOnMount: 'always',
    retry: false,
    throwOnError: false
  });

  return <Modal
    open={open}
    onClose={() => setOpenAction(false)}
  >
    <Box sx={{...style}} component={'form'} onSubmit={onSubmit}>
      <Controller
        name='name'
        control={control}
        render={({ field }) =>
          <TextField
            sx={{width: '100%'}}
            label={'Name'}
            {...field}
          />
        }
      />
    </Box>
  </Modal>;
}