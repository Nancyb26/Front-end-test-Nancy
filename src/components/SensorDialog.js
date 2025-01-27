import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const SensorDialog = ({
  open,
  onClose,
  newSensor,
  onInputChange,
  onAddSensor,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Add New Sensor Data</DialogTitle>
    <DialogContent>
      {Object.keys(newSensor).map((field) => (
        <TextField
          key={field}
          name={field}
          label={field.replace("_", " ").toUpperCase()}
          value={newSensor[field]}
          onChange={onInputChange}
          fullWidth
          margin="dense"
        />
      ))}
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onClose}
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
        onClick={onAddSensor}
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
);

export default SensorDialog;
