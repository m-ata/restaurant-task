import { Cancel, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { Dispatch, FC, SetStateAction } from "react";

interface IProps {
  setTextFilter: Dispatch<SetStateAction<string>>;
  textFilter: string;
  label: string;
}

export const TextSearchInput: FC<IProps> = ({
  setTextFilter,
  textFilter,
  label,
}) => {
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
