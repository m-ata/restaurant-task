/* eslint-disable react/prop-types */
import { TableCell, TableRow } from "@mui/material";
import React from "react";

export const StayDataRow = ({ row }) => {
  return (
    <TableRow key={row.stayId}>
      <TableCell align="center">
        {row.businessDate}
      </TableCell>
      <TableCell align="center">
        {`${row.customer?.firstName} ${row.customer?.lastName}`}
      </TableCell>
      <TableCell align="center">{row.status}</TableCell>
      <TableCell align="center">{row.shift}</TableCell>
      <TableCell align="center">
        {new Date(row.start).toLocaleDateString()}
      </TableCell>
      <TableCell align="center">
        {new Date(row.end).toLocaleDateString()}
      </TableCell>
      <TableCell align="center">{row.quantity}</TableCell>
      <TableCell align="center">{row.area}</TableCell>
      <TableCell align="center">{row.guestNotes || "-"}</TableCell>
    </TableRow>
  );
};
