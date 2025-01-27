import React, { useState, useMemo } from "react";
import { TableCell, TableContainer, TableRow, Paper, Box } from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";
import Pagination from "@mui/material/Pagination";
import "../styles.css";
import TableHeader from "./TableHeader";
import FilterButton from "./FilterButton"; 
import AddButton from "./AddButton"; 
import SensorDialog from "./SensorDialog";

const rowsPerPage = 50;

const columns = [
  { label: "Timestamp", dataKey: "reading_ts", width: 150 },
  { label: "Sensor Type", dataKey: "sensor_type", width: 150 },
  { label: "Box ID", dataKey: "box_id", width: 150 },
  { label: "Name", dataKey: "name", width: 150 },
  { label: "Reading", dataKey: "reading", width: 150, numeric: true },
  { label: "Unit", dataKey: "unit", width: 100 },
  { label: "Location (Lat, Lon)", dataKey: "location", width: 250 },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer
      component={Paper}
      {...props}
      ref={ref}
      className="table-container"
    />
  )),
  Table: (props) => <table {...props} className="table" />,
  TableHead: React.forwardRef((props, ref) => <thead {...props} ref={ref} />),
  TableRow: (props) => <tr {...props} />,
  TableBody: React.forwardRef((props, ref) => <tbody {...props} ref={ref} />),
};

function SensorTable({ data, onSort, sortBy, sortOrder, onNewSensor }) {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [newSensor, setNewSensor] = useState({
    reading_ts: "",
    sensor_type: "",
    box_id: "",
    name: "",
    reading: "",
    unit: "",
    latitude: "",
    longitude: "",
  });

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  const filteredData = useMemo(() => {
    if (!filter) return data;

    return data.filter(
      (item) =>
        item.sensor_type.toLowerCase().includes(filter.toLowerCase()) ||
        item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  const paginatedData = useMemo(
    () => filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
    [filteredData, page]
  );

  const startIndex = page * rowsPerPage + 1;
  const endIndex = Math.min((page + 1) * rowsPerPage, filteredData.length);

  const fixedHeaderContent = () => (
    <TableRow>
      {columns.map((column) => (
        <TableHeader
          key={column.dataKey}
          column={column}
          isActive={
            sortBy ===
            (column.dataKey === "reading_ts" ? "time" : "sensor_type")
          }
          sortOrder={sortOrder}
          onSort={onSort}
        />
      ))}
    </TableRow>
  );

  const rowContent = (_index, sensor) =>
    columns.map((column) => {
      const value =
        column.dataKey === "location"
          ? `${sensor.latitude}, ${sensor.longitude}`
          : sensor[column.dataKey];
      return (
        <TableCell
          key={column.dataKey}
          className={`table-cell ${column.numeric ? "table-cell-right" : ""}`}
        >
          {value}
        </TableCell>
      );
    });

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilter = (value) => {
    setFilter(value);
    handleMenuClose();
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    setNewSensor({ ...newSensor, [e.target.name]: e.target.value });
  };

  const handleAddSensor = () => {
    onNewSensor(newSensor);
    setNewSensor({
      reading_ts: "",
      sensor_type: "",
      box_id: "",
      name: "",
      reading: "",
      unit: "",
      latitude: "",
      longitude: "",
    });
    handleDialogClose();
  };

  return (
    <div className="sensor-table-container">
      <Box className="header-box">
        <h1 className="header-title">Environmental Sensor Dashboard</h1>
        <Box className="header-actions">
          <FilterButton
            filter={filter}
            onFilter={handleFilter}
            onMenuClick={handleMenuClick}
            anchorEl={anchorEl}
            onMenuClose={handleMenuClose}
            data={data}
          />
          <AddButton onClick={handleDialogOpen} />
        </Box>
      </Box>

      <SensorDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        newSensor={newSensor}
        onInputChange={handleInputChange}
        onAddSensor={handleAddSensor}
      />

      <Paper className="table-paper">
        <TableVirtuoso
          data={paginatedData}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>

      <Box className="pagination-box">
        <span>
          {startIndex}-{endIndex} of {filteredData.length}
        </span>
        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={page + 1}
          onChange={handlePageChange}
          color="primary"
          sx={{
            "ul > li > button.Mui-selected": {
              backgroundColor: "#ff7966",
              opacity: 0.8,
            },
          }}
        />
      </Box>
    </div>
  );
}

export default SensorTable;
