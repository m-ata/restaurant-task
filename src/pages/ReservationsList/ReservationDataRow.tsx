import { TableCell, TableRow } from "@mui/material";
import React, { FC } from "react";

interface IProps {
  row: Reservation;
}

export const ReservationDataRow: FC<IProps> = ({ row }) => {
  return (
    <TableRow key={row.id}>
      <TableCell align="center">{row.businessDate}</TableCell>
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
