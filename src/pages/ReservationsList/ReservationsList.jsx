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
import { StayDataRow } from "./StayDataRow";
import { useLocation } from "react-router-dom";
import { mockData } from "../../mock-data";
import { SearchStaysDescription } from "../../components/SearchStaysDescription/SearchStaysDescription";
import { getPageCount } from "../../utils/utils";
import { DateRangePicker } from "../../components/DateRangePicker/DateRangePicker";

const defaultDateRange = {
  startDate: "",
  endDate: "",
};

const ReservationsList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPageOptions = [10, 15, 20, 25];
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [dateRangeFilter, setDateRangeFilter] = useState(defaultDateRange);
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const { pathname } = useLocation();

  const filterByDate = staysData => {
    if (dateRangeFilter.startDate && !dateRangeFilter.endDate) {
      return staysData.filter(
        ({ startDate }) =>
          new Date(startDate).getTime() >= new Date(dateRangeFilter.startDate),
      );
    }
    if (!dateRangeFilter.startDate && dateRangeFilter.endDate) {
      return staysData.filter(
        ({ startDate }) =>
          new Date(startDate).getTime() <= new Date(dateRangeFilter.endDate),
      );
    }
    if (dateRangeFilter.startDate && dateRangeFilter.endDate) {
      return staysData.filter(
        ({ startDate }) =>
          new Date(startDate).getTime() <= new Date(dateRangeFilter.endDate) &&
          new Date(startDate).getTime() >= new Date(dateRangeFilter.startDate),
      );
    }
    return staysData;
  };

  const filterByDescription = staysData => {
    if (descriptionFilter) {
      return staysData.filter(
        data =>
          data.stayDescription.includes(descriptionFilter.trim()) ||
          data.code?.includes?.(descriptionFilter.trim()),
      );
    }
    return staysData;
  };

  useEffect(() => {
    setDateRangeFilter(defaultDateRange);
    setDescriptionFilter("");
  }, [pathname]);

  const filteredStays = filterByDescription(filterByDate(mockData));

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
        {filteredStays
          ?.slice(
            (pageNumber - 1) * itemsPerPage,
            (pageNumber - 1) * itemsPerPage + itemsPerPage,
          )
          .map(row => (
            <StayDataRow key={row.stayId} row={row} />
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
              <SearchStaysDescription
                setDescriptionFilter={setDescriptionFilter}
                descriptionFilter={descriptionFilter}
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

      {!!filteredStays?.length && (
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
            count={getPageCount(filteredStays?.length, itemsPerPage)}
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
