/* eslint-disable react/prop-types */
import { Sort } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { FC } from "react";
import { sortTypes } from "../../utils/constants";

interface IProps {
  sortValue: string;
  setSortValue: (e: (prevSort: string) => string) => void
}

export const SortButton: FC<IProps> = ({ sortValue, setSortValue }) => {
  const setSort = (prevSort: string) => {
    switch (prevSort) {
      case sortTypes.none:
        return sortTypes.descending;
      case sortTypes.descending:
        return sortTypes.ascending;

      default:
        return sortTypes.none;
    }
  };

  return (
    <IconButton disableRipple onClick={() => setSortValue(setSort)}>
      <Sort
        className={`sort-button ${sortValue ? "active" : ""} ${
          sortValue === sortTypes.ascending ? "ascending" : ""
        }`}
      />
    </IconButton>
  );
};
