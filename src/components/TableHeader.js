import React from "react";
import { TableCell } from "@mui/material";

const TableHeader = ({ column, isActive, sortOrder, onSort }) => {
  const isSortable =
    column.dataKey === "reading_ts" || column.dataKey === "sensor_type";

  return (
    <TableCell
      key={column.dataKey}
      className={`table-header ${column.numeric ? "table-header-right" : ""}`}
      style={{ width: column.width }}
      onClick={() =>
        isSortable &&
        onSort(column.dataKey === "reading_ts" ? "time" : "sensor_type")
      }
    >
      {column.label}
      {isSortable && (
        <span style={{ marginLeft: 10 }}>
          <span
            className={`arrow-up ${
              isActive && sortOrder === "asc" ? "active" : ""
            }`}
          >
            ▲
          </span>
          <span
            className={`arrow-down ${
              isActive && sortOrder === "desc" ? "active" : ""
            }`}
          >
            ▼
          </span>
        </span>
      )}
    </TableCell>
  );
};

export default TableHeader;
