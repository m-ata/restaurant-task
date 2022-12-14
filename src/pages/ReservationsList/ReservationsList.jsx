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
import { DropDown } from "../../components/DropDown/DropDown";
import { sortTypes } from "../../utils/constants";
import { SortButton } from "../../components/SortButton/SortButton";

const ReservationsList = () => {
  const defaultDateRange = {
    start: "",
    end: "",
  };

  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPageOptions = [10, 15, 20, 25];
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [dateRangeFilter, setDateRangeFilter] = useState(defaultDateRange);
  const [nameFilter, setNameFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");
  const [shiftFilter, setShiftFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortByName, setSortByName] = useState(sortTypes.none);
  const [sortByQuantity, setSortByQuantity] = useState(sortTypes.none);
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
          data.customer?.firstName
            ?.toLowerCase?.()
            .includes(nameFilter.toLowerCase().trim()) ||
          data.customer?.lastName
            ?.toLowerCase?.()
            .includes(nameFilter.toLowerCase().trim()),
      );
    }
    return reservationsData;
  };

  const filterByArea = reservationsData => {
    if (areaFilter !== "all") {
      return reservationsData.filter(data => data.area === areaFilter);
    }
    return reservationsData;
  };

  const filterByShift = reservationsData => {
    if (shiftFilter !== "all") {
      return reservationsData.filter(data => data.shift === shiftFilter);
    }
    return reservationsData;
  };

  const filterByStatus = reservationsData => {
    if (statusFilter !== "all") {
      return reservationsData.filter(data => data.status === statusFilter);
    }
    return reservationsData;
  };

  const applyNameSort = array => {
    if (sortByName === sortTypes.none) {
      return filterByStatus(
        filterByShift(filterByArea(filterByName(filterByDate(mockData)))),
      );
    }

    return array.sort((a, b) => {
      if (
        `${a.firstName} ${a.lastName}`.toLowerCase() <
        `${b.firstName} ${b.lastName}`.toLowerCase()
      ) {
        return sortByName === sortTypes.ascending ? -1 : 1;
      }
      if (
        `${a.firstName} ${a.lastName}`.toLowerCase() >
        `${b.firstName} ${b.lastName}`.toLowerCase()
      ) {
        return sortByName === sortTypes.ascending ? 1 : -1;
      }
      return 0;
    });
  };

  const applyQuantitySort = array => {
    if (sortByQuantity === sortTypes.none) {
      return filterByStatus(
        filterByShift(filterByArea(filterByName(filterByDate(mockData)))),
      );
    }

    return array.sort((a, b) => {
      if (a.quantity < b.quantity) {
        return sortByQuantity === sortTypes.ascending ? -1 : 1;
      }
      if (a.quantity > b.quantity) {
        return sortByQuantity === sortTypes.ascending ? 1 : -1;
      }
      return 0;
    });
  };

  useEffect(() => {
    setDateRangeFilter(defaultDateRange);
    setNameFilter("");
  }, [pathname]);

  const filteredReservations = applyNameSort(
    applyQuantitySort(
      filterByStatus(
        filterByShift(filterByArea(filterByName(filterByDate(mockData)))),
      ),
    ),
  );

  const renderTable = () => (
    <Table stickyHeader size="large">
      <TableHead>
        <TableRow>
          <TableCell align="center">Business Date</TableCell>
          <TableCell align="center">
            <span>Customer Name</span>
            <SortButton sortValue={sortByName} setSortValue={setSortByName} />
          </TableCell>
          <TableCell align="center">Status</TableCell>
          <TableCell align="center">Shift</TableCell>
          <TableCell align="center">Start Date</TableCell>
          <TableCell align="center">End Date</TableCell>
          <TableCell align="center">
            <span>Quantity</span>
            <SortButton
              sortValue={sortByQuantity}
              setSortValue={setSortByQuantity}
            />
          </TableCell>
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

  const getFilterMenuOptions = field => [
    { label: "All", value: "all" },
    ...[...new Set(mockData.map(val => val[field]))].map(val => ({
      label: val,
      value: val,
    })),
  ];

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
              <div className="reservations-table__filters-container">
                <DropDown
                  label="Area"
                  value={areaFilter}
                  onChange={e => setAreaFilter(e.target.value)}
                  menuItems={getFilterMenuOptions("area")}
                />
                <DropDown
                  label="Shift"
                  value={shiftFilter}
                  onChange={e => setShiftFilter(e.target.value)}
                  menuItems={getFilterMenuOptions("shift")}
                />
                <DropDown
                  label="Status"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  menuItems={getFilterMenuOptions("status")}
                />
                <DateRangePicker
                  setDateRangeFilter={setDateRangeFilter}
                  dateRangeFilter={dateRangeFilter}
                />
              </div>
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
