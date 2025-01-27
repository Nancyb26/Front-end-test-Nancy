import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SensorTable from "../TableComponent";
import React from "react";

const mockData = [
  {
    id: "Box-A1-O3",
    box_id: "Box-A1",
    sensor_type: "O3",
    name: "Ozone",
    range_l: 0,
    range_u: 1000,
    longitude: -0.06507,
    latitude: 51.51885,
    reading: 817,
    unit: "ppm",
    reading_ts: "2019-09-10T00:00:00",
  },
  {
    id: "Box-A1-CO",
    box_id: "Box-A1",
    sensor_type: "CO",
    name: "Carbon monoxide",
    range_l: 0,
    range_u: 1000,
    longitude: -0.06507,
    latitude: 51.51885,
    reading: 800,
    unit: "ppm",
    reading_ts: "2020-09-10T00:00:00",
  },
];


const mockSortHandler = jest.fn();
const mockNewSensorHandler = jest.fn();

describe("SensorTable Component", () => {
  test("sorts by time (ascending)", async () => {
    render(
      <SensorTable
        data={mockData}
        onSort={mockSortHandler}
        sortBy="time"
        sortOrder="asc"
        onNewSensor={mockNewSensorHandler}
      />
    );

    const timeHeader = screen.getByText(/Timestamp/i);
    fireEvent.click(timeHeader); 

    await waitFor(() => expect(mockSortHandler).toHaveBeenCalledWith("time"));
  });

  test("sorts by sensor type (ascending)", async () => {
    render(
      <SensorTable
        data={mockData}
        onSort={mockSortHandler}
        sortBy="sensor_type"
        sortOrder="asc"
        onNewSensor={mockNewSensorHandler}
      />
    );

    const sensorTypeHeader = screen.getByText(/Sensor Type/i);
    fireEvent.click(sensorTypeHeader); 

    await waitFor(() =>
      expect(mockSortHandler).toHaveBeenCalledWith("sensor_type")
    );
  });

  test("filters by sensor type", async () => {
    render(
      <SensorTable
        data={mockData}
        onSort={mockSortHandler}
        onNewSensor={mockNewSensorHandler}
      />
    );
  
    const filterButton = screen.getByRole("button", { name: /filter/i });
    fireEvent.click(filterButton);

    await waitFor(() => screen.findByRole("menuitem", { name: /CO/i }));
  
    const coFilterOption = screen.getByRole("menuitem", { name: /CO/i });
    fireEvent.click(coFilterOption); 
  
    await waitFor(() => {
        const filteredData = screen.getByText(/CO/i);
        expect(filteredData).toBeInTheDocument();
      });
  });
  
  test("filters by sensor name", async () => {
    render(
      <SensorTable
        data={mockData}
        onSort={mockSortHandler}
        onNewSensor={mockNewSensorHandler}
      />
    );
  

    const filterButton = screen.getByaRole("button", { name: /filter/i });
    fireEvent.click(filterButton)
  
    await waitFor(() => screen.getByText(/Ozone/i));

    const ozoneFilterOption = screen.getByRole("menuitem", { name: /Ozone/i });
    fireEvent.click(ozoneFilterOption);

    await waitFor(() => {
      const filteredData = screen.getByText(/Ozone/i);
      expect(filteredData).toBeInTheDocument();
    });
  });
  

  test("combines sorting and filtering", async () => {
    render(
      <SensorTable
        data={mockData}
        onSort={mockSortHandler}
        sortBy="sensor_type"
        sortOrder="asc"
        onNewSensor={mockNewSensorHandler}
      />
    );


    const sensorTypeHeader = screen.getByText(/Sensor Type/i);
    fireEvent.click(sensorTypeHeader); 

    await waitFor(() => {
      expect(mockSortHandler).toHaveBeenCalledWith("sensor_type");
    });

    const filterButton = screen.getByRole("button", { name: /filter/i });
    fireEvent.click(filterButton);

    await waitFor(() => screen.findByRole("menuitem", { name: /Ozone/i }));

    const ozoneFilterOption = screen.getByRole("menuitem", { name: /Ozone/i });
    fireEvent.click(ozoneFilterOption);

    await waitFor(() => {
      const filteredData = screen.getByText(/Ozone/i);
      expect(filteredData).toBeInTheDocument();
    });
  });
});
