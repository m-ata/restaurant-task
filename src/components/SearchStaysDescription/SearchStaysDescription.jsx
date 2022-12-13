/* eslint-disable react/prop-types */
import { Cancel, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

export const SearchStaysDescription = ({
  setDescriptionFilter,
  descriptionFilter,
}) => {

  return (
    <div className="search-description-section">
      <TextField
        value={descriptionFilter}
        type="text"
        size="small"
        onChange={e => setDescriptionFilter(e.target.value)}
        label="Description"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {descriptionFilter ? (
                <IconButton
                  disableRipple
                  onClick={() => setDescriptionFilter("")}>
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
