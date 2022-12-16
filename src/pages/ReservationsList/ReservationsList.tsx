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
  const [sortByName, setSortByName] = useState<null | string>(sortTypes.none);
  const [sortByQuantity, setSortByQuantity] = useState<null | string>(
    sortTypes.none,
  );
  const { pathname } = useLocation();

  useEffect(() => {
    setDateRangeFilter(defaultDateRange);
    setNameFilter("");
  }, [pathname]);

  //handling filter by start and end date
  const filterByDate = (reservationsData: Reservation[]): Reservation[] => {
    if (dateRangeFilter.start && !dateRangeFilter.end) {
      return reservationsData.filter(
        ({ start }) =>
          new Date(start).getTime() >=
          new Date(dateRangeFilter.start).getTime(),
      );
    }
    if (!dateRangeFilter.start && dateRangeFilter.end) {
      return reservationsData.filter(
        ({ start }) =>
          new Date(start).getTime() <= new Date(dateRangeFilter.end).getTime(),
      );
    }
    if (dateRangeFilter.start && dateRangeFilter.end) {
      return reservationsData.filter(
        ({ start }) =>
          new Date(start).getTime() <=
            new Date(dateRangeFilter.end).getTime() &&
          new Date(start).getTime() >=
            new Date(dateRangeFilter.start).getTime(),
      );
    }
    return reservationsData;
  };

  //handling filter by customer name
  const filterByName = (reservationsData: Reservation[]): Reservation[] => {
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

  //handling filter by area
  const filterByArea = (reservationsData: Reservation[]): Reservation[] => {
    if (areaFilter !== "all") {
      return reservationsData.filter(data => data.area === areaFilter);
    }
    return reservationsData;
  };

  //handling filter by shift
  const filterByShift = (reservationsData: Reservation[]): Reservation[] => {
    if (shiftFilter !== "all") {
      return reservationsData.filter(data => data.shift === shiftFilter);
    }
    return reservationsData;
  };

  //handling filter by shift
  const filterByStatus = (reservationsData: Reservation[]): Reservation[] => {
    if (statusFilter !== "all") {
      return reservationsData.filter(data => data.status === statusFilter);
    }
    return reservationsData;
  };

  //handling sort by customer name
  const applyNameSort = (array: Reservation[]): Reservation[] => {
    if (sortByName === sortTypes.none) {
      return array;
    }

    return [...array].sort((a, b) => {
      if (
        `${a.customer?.firstName} ${a.customer?.lastName}`.toLowerCase() <
        `${b.customer?.firstName} ${b.customer?.lastName}`.toLowerCase()
      ) {
        return sortByName === sortTypes.ascending ? -1 : 1;
      }
      if (
        `${a.customer?.firstName} ${a.customer?.lastName}`.toLowerCase() >
        `${b.customer?.firstName} ${b.customer?.lastName}`.toLowerCase()
      ) {
        return sortByName === sortTypes.ascending ? 1 : -1;
      }
      return 0;
    });
  };

  //handling sort by quantity
  const applyQuantitySort = (array: Reservation[]): Reservation[] => {
    if (sortByQuantity === sortTypes.none) {
      return array;
    }

    return [...array].sort((a, b) => {
      if (a.quantity < b.quantity) {
        return sortByQuantity === sortTypes.ascending ? -1 : 1;
      }
      if (a.quantity > b.quantity) {
        return sortByQuantity === sortTypes.ascending ? 1 : -1;
      }
      return 0;
    });
  };

  // Apply all modular filters and sorts
  const filteredReservations = filterByStatus(
    filterByShift(
      filterByArea(
        filterByName(filterByDate(applyQuantitySort(applyNameSort(mockData)))),
      ),
    ),
  );

  const renderTable = () => (
    <Table stickyHeader size="medium">
      <TableHead>
        <TableRow>
          <TableCell align="center">Business Date</TableCell>
          <TableCell align="center">
            <span>Customer Name</span>
            <SortButton
              sortValue={sortByName}
              setSortValue={val => {
                setSortByQuantity(sortTypes.none);
                setSortByName(val);
              }}
            />
          </TableCell>
          <TableCell align="center">Status</TableCell>
          <TableCell align="center">Shift</TableCell>
          <TableCell align="center">Start Date</TableCell>
          <TableCell align="center">End Date</TableCell>
          <TableCell align="center">
            <span>Quantity</span>
            <SortButton
              sortValue={sortByQuantity}
              setSortValue={val => {
                setSortByName(sortTypes.none);
                setSortByQuantity(val);
              }}
            />
          </TableCell>
          <TableCell align="center">Area</TableCell>
          <TableCell align="center">Guest Notes</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredReservations
          ?.slice(  // Get current page items only
            (pageNumber - 1) * itemsPerPage,
            (pageNumber - 1) * itemsPerPage + itemsPerPage,
          )
          .map(row => (
            <ReservationDataRow key={row.id} row={row} />
          ))}
      </TableBody>
    </Table>
  );

  // Create filters dropdown object from mock data
  const getFilterMenuOptions = (field: keyof Reservation): MenuOptions[] => [
    { label: "All", value: "all" },
    ...([...new Set(mockData.map(val => val[field]))].map(val => ({
      label: val,
      value: val,
    })) as MenuOptions[]),
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
                  onChange={e => setAreaFilter(e.target.value as string)}
                  menuItems={getFilterMenuOptions("area")}
                />
                <DropDown
                  label="Shift"
                  value={shiftFilter}
                  onChange={e => setShiftFilter(e.target.value as string)}
                  menuItems={getFilterMenuOptions("shift")}
                />
                <DropDown
                  label="Status"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value as string)}
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
      {/* Pagination options */}
      {!!filteredReservations?.length && (
        <div className="reservations-table__pagination">
          <TextField
            className="reservations-table__items-per-page"
            label="Items Per Page"
            value={itemsPerPage}
            variant="standard"
            select
            onChange={e => {
              setItemsPerPage(+e.target.value);
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
