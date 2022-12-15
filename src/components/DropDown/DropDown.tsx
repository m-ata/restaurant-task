/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { FC } from "react";

interface IProps {
  label: string;
  value: string | number;
  onChange: (e: any) => void;
  menuItems: MenuOptions[];
}

export const DropDown: FC<IProps> = ({ label, value, onChange, menuItems }) => {
  const labelId = btoa(Math.random().toString());

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
