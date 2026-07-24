'use client';

import { Dispatch, SetStateAction } from "react";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { getAllUsers } from "@/app/lib/GlobalDataService";
import { authorizeWithNotesToken } from "@/app/lib/AuthenticationService";
import {createCampaign} from "@/app/lib/CampaignService";

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

  const { control, handleSubmit, reset } = useForm<CreateCampaignFormData>({
    defaultValues: {
      name: ''
    }
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    refetchOnMount: 'always',
    retry: false,
    throwOnError: false
  });

  const { data: authData } = useQuery({
    queryKey: ['auth'],
    queryFn: authorizeWithNotesToken,
    retry: false,
    throwOnError: false
  });

  const onSubmit = handleSubmit((data) => {
    if(!authData) return;
    createCampaign(data.name, authData.id).then(() => {
      setOpenAction(false);
      reset();
    });
  });

  return <Modal
    open={open}
    onClose={() => setOpenAction(false)}
  >
    <Box sx={{...style}} component={'form'} onSubmit={onSubmit}>
      <Stack spacing={2}>
        <Typography variant={'h4'}>Create Campaign</Typography>
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
        <Button
          variant={'outlined'}
          type={'submit'}
        >
          Create
        </Button>
      </Stack>
    </Box>
  </Modal>;
}