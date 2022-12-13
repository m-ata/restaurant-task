/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export const DropDown = ({ label, value, onChange, menuItems }) => {
  const labelId = btoa(Math.random());

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select value={value} labelId={labelId} label={label} onChange={onChange}>
        {menuItems?.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
