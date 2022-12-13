/* eslint-disable max-lines */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Divider,
  MenuItem,
  Pagination,
  TextField,
  Toolbar,
} from "@mui/material";
import { ReservationDataRow } from "./ReservationDataRow";
import { useLocation } from "react-router-dom";
import { mockData } from "../../mock-data";
import { TextSearchInput } from "../../components/TextSearchInput/TextSearchInput";
import { getPageCount } from "../../utils/utils";
import { DateRangePicker } from "../../components/DateRangePicker/DateRangePicker";

const defaultDateRange = {
  start: "",
  end: "",
};

const ReservationsList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPageOptions = [10, 15, 20, 25];
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [dateRangeFilter, setDateRangeFilter] = useState(defaultDateRange);
  const [nameFilter, setNameFilter] = useState("");
  const { pathname } = useLocation();

  const filterByDate = reservationsData => {
    if (dateRangeFilter.start && !dateRangeFilter.end) {
      return reservationsData.filter(
        ({ start }) =>
          new Date(start).getTime() >= new Date(dateRangeFilter.start),
      );
    }
    if (!dateRangeFilter.start && dateRangeFilter.end) {
      return reservationsData.filter(
        ({ start }) =>
          new Date(start).getTime() <= new Date(dateRangeFilter.end),
      );
    }
    if (dateRangeFilter.start && dateRangeFilter.end) {
      return reservationsData.filter(
        ({ start }) =>
          new Date(start).getTime() <= new Date(dateRangeFilter.end) &&
          new Date(start).getTime() >= new Date(dateRangeFilter.start),
      );
    }
    return reservationsData;
  };

  const filterByName = reservationsData => {
    if (nameFilter) {
      return reservationsData.filter(
        data =>
          data.customer?.firstName?.toLowerCase?.().includes(nameFilter.toLowerCase().trim()) ||
          data.customer?.lastName?.toLowerCase?.().includes(nameFilter.toLowerCase().trim()),
      );
    }
    return reservationsData;
  };

  useEffect(() => {
    setDateRangeFilter(defaultDateRange);
    setNameFilter("");
  }, [pathname]);

  const filteredReservations = filterByName(filterByDate(mockData));

  const renderTable = () => (
    <Table stickyHeader size="large">
      <TableHead>
        <TableRow>
          <TableCell align="center">Business Date</TableCell>
          <TableCell align="center">Customer Name</TableCell>
          <TableCell align="center">Status</TableCell>
          <TableCell align="center">Shift</TableCell>
          <TableCell align="center">Start Date</TableCell>
          <TableCell align="center">End Date</TableCell>
          <TableCell align="center">Quantity</TableCell>
          <TableCell align="center">Area</TableCell>
          <TableCell align="center">Guest Notes</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredReservations
          ?.slice(
            (pageNumber - 1) * itemsPerPage,
            (pageNumber - 1) * itemsPerPage + itemsPerPage,
          )
          .map(row => (
            <ReservationDataRow key={row.id} row={row} />
          ))}
      </TableBody>
    </Table>
  );

  return (
    <div>
      <Box>
        <Paper className="reservations-table__paper">
          <TableContainer
            className="reservations-table__container"
            component={Paper}>
            <Toolbar className="reservations-table__toolbar">
              <TextSearchInput
                setTextFilter={setNameFilter}
                textFilter={nameFilter}
                label="Search By Name"
              />
              <DateRangePicker
                setDateRangeFilter={setDateRangeFilter}
                dateRangeFilter={dateRangeFilter}
              />
            </Toolbar>
            <Divider />
            {renderTable()}
          </TableContainer>
        </Paper>
      </Box>

      {!!filteredReservations?.length && (
        <div className="reservations-table__pagination">
          <TextField
            className="reservations-table__items-per-page"
            label="Items Per Page"
            value={itemsPerPage}
            variant="standard"
            select
            onChange={e => {
              setItemsPerPage(e.target.value);
              setPageNumber(1);
            }}>
            {itemsPerPageOptions.map(value => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
          <Pagination
            count={getPageCount(filteredReservations?.length, itemsPerPage)}
            size="large"
            page={pageNumber}
            onChange={(_, page) => setPageNumber(page)}
          />
        </div>
      )}
    </div>
  );
};

export default ReservationsList;
