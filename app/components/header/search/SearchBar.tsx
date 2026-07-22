'use client';

import {Divider, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select} from "@mui/material";
import {Search} from "@mui/icons-material";
import {useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getAllCampaigns} from "@/app/lib/GlobalDataService";

export default function SearchBar(){
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();
  const { data: selectedCampaignId } = useQuery({
    queryKey: ['camp_id'],
    retry: false,
    throwOnError: false,
    queryFn: () => null
  });

  const { data: campaigns } = useQuery({
    queryKey: ['campaigns'],
    retry: false,
    throwOnError: false,
    queryFn: getAllCampaigns
  });

  return <Paper
    variant="outlined"
    sx={{
      display: "flex",
      alignItems: "stretch",
      overflow: "hidden",
    }}
  >
    <OutlinedInput
      placeholder={selectedCampaignId ? 'Search' : 'Select campaign first ->'}
      endAdornment={
        <InputAdornment position="end">
          <Search />
        </InputAdornment>
      }
      sx={{
        flex: 1,
        "& fieldset": { border: "none" },
      }}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      disabled={!selectedCampaignId}
    />
    <Divider orientation="vertical" flexItem />
    <FormControl>
      <InputLabel id={'camp_id'} />
      <Select
        label={'Campaign'}
        variant="standard"
        disableUnderline
        value={selectedCampaignId ?? ""}
        onChange={(e) => queryClient.setQueryData(['camp_id'], e.target.value)}
        sx={{ px: 2, minWidth: 220 }}
      >
        {campaigns && campaigns.map(camp => <MenuItem key={camp.id} value={camp.id}>{camp.name}</MenuItem>)}
      </Select>
    </FormControl>
  </Paper>;
}