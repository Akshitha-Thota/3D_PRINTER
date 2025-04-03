const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

// Arrays to hold historical temperature data
let extruderTempHistory = [];
let heaterBedTempHistory = [];

// Function to generate random data
const generateMockData = () => {
    const extruderTemp = Math.floor(Math.random() * (250 - 20 + 1)) + 20;
    const heaterBedTemp = Math.floor(Math.random() * (80 - 20 + 1)) + 20;
    const printProgress = Math.floor(Math.random() * 101);
    const printerStatus = Math.random() > 0.5 ? "Printing" : "Idle";

    // Store the latest temperatures in history
    extruderTempHistory.push(extruderTemp);
    heaterBedTempHistory.push(heaterBedTemp);

    // Limit history to the last 10 entries
    if (extruderTempHistory.length > 10) extruderTempHistory.shift();
    if (heaterBedTempHistory.length > 10) heaterBedTempHistory.shift();

    return {
        extruderTemp,
        heaterBedTemp,
        printProgress,
        printerStatus,
        extruderTempHistory,
        heaterBedTempHistory
    };
};

// API endpoint to get printer status
app.get('/api/printer-status', (req, res) => {
    res.json(generateMockData());
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
