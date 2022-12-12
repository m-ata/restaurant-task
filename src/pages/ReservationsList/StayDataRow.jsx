/* eslint-disable react/prop-types */
import { TableCell, TableRow, Tooltip } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { getHoursInTimestamp } from "../../utils/utils";

export const StatusIndicator = ({ lastTripUpdate }) => (
  <div
    className={classNames("stay-status-indicator", {
      "stay-status-indicator--gray": !lastTripUpdate,
      "stay-status-indicator--green":
        lastTripUpdate && getHoursInTimestamp(lastTripUpdate) <= 24,
      "stay-status-indicator--yellow":
        lastTripUpdate &&
        getHoursInTimestamp(lastTripUpdate) > 24 &&
        getHoursInTimestamp(lastTripUpdate) <= 48,
      "stay-status-indicator--red":
        lastTripUpdate && getHoursInTimestamp(lastTripUpdate) > 48,
    })}
  />
);

export const StayDataRow = ({ row }) => {
  return (
    <TableRow key={row.stayId}>
      <TableCell align="center" className="stay-status-indicator">
        <Tooltip title="Status">
          <span>
            <StatusIndicator lastTripUpdate={row.lastTripUpdateDate} />
          </span>
        </Tooltip>
      </TableCell>
      <TableCell align="center" className="edit-stay-description-input">
        Descriptions
      </TableCell>
      <TableCell align="center">Start Date</TableCell>
      <TableCell align="center">End Date</TableCell>
      <TableCell align="center">Number Of Fishers</TableCell>
      <TableCell align="center">Code</TableCell>
      <TableCell align="center">Boat ID</TableCell>
    </TableRow>
  );
};
