'use client';

import {Divider, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select} from "@mui/material";
import {Search} from "@mui/icons-material";
import {useGlobalData} from "@/app/components/global/useGlobalData";
import {useState} from "react";

export default function SearchBar(){
  const { selectedCampaignId, setSelectedCampaignId, campaigns } = useGlobalData();
  const [searchQuery, setSearchQuery] = useState('');

  return <Paper
    variant="outlined"
    sx={{
      display: "flex",
      alignItems: "stretch",
      overflow: "hidden"
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
        onChange={(e) => setSelectedCampaignId(e.target.value)}
        sx={{ px: 2, minWidth: 220 }}
      >
        {campaigns.map(camp => <MenuItem key={camp.id} value={camp.id}>{camp.name}</MenuItem>)}
      </Select>
    </FormControl>
  </Paper>;
}