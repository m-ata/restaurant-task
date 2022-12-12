/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import React from "react";

export const DateRangePicker = ({ setDateRangeFilter, dateRangeFilter }) => {

  return (
    <div className="date-range-picker">
      <TextField
        value={dateRangeFilter.startDate}
        id="Start-date"
        label="Start Date"
        type="date"
        onChange={e =>
          setDateRangeFilter(prevState => ({
            ...prevState,
            startDate: e.target.value,
          }))
        }
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        value={dateRangeFilter.endDate}
        id="End-date"
        label="End Date"
        type="date"
        onChange={e =>
          setDateRangeFilter(prevState => ({
            ...prevState,
            endDate: e.target.value,
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
