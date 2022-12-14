/* eslint-disable react/prop-types */
import { Sort } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { sortTypes } from "../../utils/constants";

export const SortButton = ({ sortValue, setSortValue }) => {
  const setSort = prevSort => {
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
