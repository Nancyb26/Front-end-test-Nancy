import React, { useState, useEffect } from "react";
import SensorTable from "./components/SensorTable";

const App = () => {
  const [sensorData, setSensorData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [sortBy, setSortBy] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [filterBy, setFilterBy] = useState(""); 

  useEffect(() => {
    fetch("/data/sensor_readings.json")
      .then((response) => response.json())
      .then((data) => {
        setSensorData(data);
        setOriginalData(data); 
      })
      .catch((error) => console.error("Failed to fetch data", error));
  }, []);

  const handleSort = (key) => {
    const order = sortBy === key && sortOrder === "asc" ? "desc" : "asc";

    const handleClearFilter = () => {
      setFilterBy("");
      setSensorData(originalData); 
    };

    const sortedData = [...sensorData].sort((a, b) => {
      if (key === "time") {
        return order === "asc"
          ? new Date(a.reading_ts) - new Date(b.reading_ts)
          : new Date(b.reading_ts) - new Date(a.reading_ts);
      } else if (key === "sensor_type") {
        const comparison = a.name.trim().localeCompare(b.name.trim());
        return order === "asc" ? comparison : -comparison;
      }
      return 0;
    });

    setSortBy(key); 
    setSortOrder(order); 
    setSensorData(sortedData); 
  };

  const handleFilter = (sensorType) => {
    setFilterBy(sensorType);
    const filteredData = sensorType
      ? originalData.filter((entry) => entry.sensor_type === sensorType)
      : originalData;
    setSensorData(filteredData); 
  };

  const handleNewSensor = (newSensor) => {
    setSensorData((prevData) => [...prevData, newSensor]);
    setOriginalData((prevData) => [...prevData, newSensor]);
  };

  return (
    <div>
      <SensorTable
        data={sensorData}
        onSort={handleSort}
        onNewSensor={handleNewSensor} 
        filterBy={filterBy}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default App;