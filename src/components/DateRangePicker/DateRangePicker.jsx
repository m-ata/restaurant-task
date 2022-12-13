/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import React from "react";

export const DateRangePicker = ({ setDateRangeFilter, dateRangeFilter }) => {

  return (
    <div className="date-range-picker">
      <TextField
        value={dateRangeFilter.start}
        id="Start-date"
        label="Start Date"
        type="date"
        onChange={e =>
          setDateRangeFilter(prevState => ({
            ...prevState,
            start: e.target.value,
          }))
        }
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        value={dateRangeFilter.end}
        id="End-date"
        label="End Date"
        type="date"
        onChange={e =>
          setDateRangeFilter(prevState => ({
            ...prevState,
            end: e.target.value,
          }))
        }
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};
