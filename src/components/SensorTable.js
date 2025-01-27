import React, { useState, useMemo } from "react";
import {
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/material/Pagination";
import "../styles.css";
import TableHeader from "./TableHeader";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: "9px",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "0px",
        }}
      >
        <h1
          style={{
            margin: 0,
            textAlign: "center",
            color: "white",
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(135deg, #ff4942, #ff7966)",
            padding: "20px 0",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
            fontSize: "2.5rem",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            lineHeight: "1.2",
          }}
        >
          Environmental Sensor Dashboard
        </h1>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FilterAltIcon />}
              onClick={handleMenuClick}
              sx={{
                textTransform: "none",
                borderColor: "#ff4942",
                color: "#ff4942",
                "&:hover": {
                  borderColor: "#ff4942",
                  backgroundColor: "rgba(255, 73, 66, 0.1)",
                },
              }}
            >
              Filter
            </Button>

            {filter && (
              <Button
                variant="contained"
                onClick={() => setFilter("")}
                sx={{
                  backgroundColor: "#ff7966",
                  color: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#ff4942",
                  },
                }}
              >
                {filter}{" "}
                <span style={{ marginLeft: "8px", cursor: "pointer" }}>✕</span>
              </Button>
            )}
          </Box>

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleDialogOpen}
            sx={{
              textTransform: "none",
              borderColor: "#ff4942",
              color: "#ff4942",
              "&:hover": {
                borderColor: "#ff4942",
                backgroundColor: "rgba(255, 73, 66, 0.1)",
              },
            }}
          >
            Add New Data
          </Button>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleFilter("")}>All</MenuItem>
        {[...new Set(data.map((item) => item.sensor_type))].map((type) => (
          <MenuItem key={type} onClick={() => handleFilter(type)}>
            {type}
          </MenuItem>
        ))}
      </Menu>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Sensor Data</DialogTitle>
        <DialogContent>
          {Object.keys(newSensor).map((field) => (
            <TextField
              key={field}
              name={field}
              label={field.replace("_", " ").toUpperCase()}
              value={newSensor[field]}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            sx={{
              color: "#ff4942",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(255, 73, 66, 0.1)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddSensor}
            sx={{
              backgroundColor: "#ff4942",
              color: "#fff",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#e9433d",
              },
            }}
          >
            Add Sensor
          </Button>
        </DialogActions>
      </Dialog>

      <Paper style={{ flexGrow: 1, width: "100%", marginTop: "0px" }}>
        <TableVirtuoso
          data={paginatedData}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
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
