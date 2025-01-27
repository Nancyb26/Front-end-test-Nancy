import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddButton = ({ onClick }) => (
  <Button
    variant="outlined"
    startIcon={<AddIcon />}
    onClick={onClick}
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
);

export default AddButton;
