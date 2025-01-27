# Environmental Sensor Dashboard by Nancy

Welcome 🎉! 

This repository contains my front-end exercise submission.
 
Feel free to explore the code and see the features that have been implemented. I’ve included a brief overview of the tools and libraries along with instructions on how to set up the project locally.

I’m excited about the opportunity to showcase my skills to Sensat and I look forward to hearing your feedback!

#### Basic Features

This application dynamically displays the sensor data fetched the data from the `sensor_readings.json` file and displayed in a scrollable table. Users are able to sort the table by the timestamp in ascending or descending order, and by the sensor type in alphabetical order.

#### Extra Features 

- **Add New Sensor Data**: 

 You can add new sensor data through a dialog form. When you do, the `handleNewSensor` function updates the state so that the table refreshes instantly to show the latest data.

 - **Filter Data**:
 
 You are able to filter data based on sensor type or name. The `handleFilter` function in the `SensorTable` component manages this feature, ensuring the displayed data matches the filter criteria. A clear filter button is also included to reset the table and show all data.


## Design decisions

#### Frameworks and Libraries 

- **React**: I chose React for this project because it is well-suited for building dynamic and interactive UIs. Its efficient state management and component-based structure made it a natural fit for this project.

- **Material-UI**: For pre-built, consistent and customisable UI components, Material UI (MUI) provided a great balance of simplicity and flexibility so, I have implemented some MUI features such as buttons, icons and pagination components.

- **React Virtuoso**: This library is great for rendering large data lists efficiently. Given the size of the sensor data, React Virtuoso ensures smooth scrolling and performance.

#### UI/UX Design
The table features a fixed header for better readability and navigation when scrolling through large data sets. Buttons like the "Filter" and "Add Sensor" were styled with bright gradients (the colour scheme was inspired by Sensat's website colours 😁) and hover effects to make the UI visually appealing and interactive.

To keep things manageable, I added pagination so users can navigate data without being overwhelmed by too much at once.

#### Code organisation

The App is structured into reusable components ( `App.js`, `SensorTable.js`, and `TableHeader.js`) to keep the code organised and easy to maintain.

State management is centralised in the `App` component, ensuring that filtering, sorting and adding data logic are kept in separate utility functions, making them easier to debug and test when needed.

## Further improvements

#### To improve this project further here are a few things that I would do:

- Add stricter rules for inputs when adding new sensors (e.g., ensuring timestamps and ranges are in valid formats) and clear error messages if someone tries to submit incomplete or incorrect data.

- Allow filtering by multiple criteria—like sensor type and reading range at the same time—for more precise data searches.

- Implement an option to toggle between different row heights and light/dark mode theming to enable users to adjust the table's display based on their preferences or accessibility needs.

- Add a feature that allows users to select multiple rows and compare sensor data side-by-side. This could be helpful for analysis or decision-making.

- Improve the table’s design for smaller screens, ensuring it works seamlessly on mobile devices.

- I would expand the test coverage to include comprehensive integration tests, ensuring that edge cases and error states are thoroughly addressed. Additionally, I would implement snapshot testing for UI components to quickly identify and catch any unexpected changes.

##  How to run the project

1. Clone the Repository:
 ```sh
   git clone https://github.com/Nancyb26/Front-end-test-Nancy.git
 ```

2. Navigate to the Project Directory:
 ```sh
   cd <project-directory>
 ```

3. Install Dependencies using npm:
 ```sh
   npm install
 ```

4. Run the Project:
 ```sh
   npm start
 ```