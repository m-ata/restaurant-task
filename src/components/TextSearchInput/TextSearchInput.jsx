/* eslint-disable react/prop-types */
import { Cancel, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

export const TextSearchInput = ({ setTextFilter, textFilter, label }) => {
  return (
    <div className="search-text-section">
      <TextField
        value={textFilter}
        type="text"
        size="small"
        onChange={e => setTextFilter(e.target.value)}
        label={label}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {textFilter ? (
                <IconButton disableRipple onClick={() => setTextFilter("")}>
                  <Cancel />
                </IconButton>
              ) : (
                <IconButton disabled>
                  <Search />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
