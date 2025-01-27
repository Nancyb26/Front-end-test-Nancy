import React from 'react';
import { Button, Menu, MenuItem, Box } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const FilterButton = ({ filter, onFilter, onMenuClick, anchorEl, onMenuClose, data }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Button
      variant="outlined"
      startIcon={<FilterAltIcon />}
      onClick={onMenuClick}
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
        onClick={() => onFilter('')}
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

    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onMenuClose}
    >
      <MenuItem onClick={() => onFilter("")}>All</MenuItem>
      {[...new Set(data.map((item) => item.sensor_type))].map((type) => (
        <MenuItem key={type} onClick={() => onFilter(type)}>
          {type}
        </MenuItem>
      ))}
    </Menu>
  </Box>
);

export default FilterButton;