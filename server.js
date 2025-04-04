const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

// Arrays to hold historical temperature data
let extruderTempHistory = [];
let heaterBedTempHistory = [];

const printers = [
    { id: 1, name: 'Epson EcoTank ET-4850', status: 'Active' },
    { id: 2, name: 'Canon PIXMA G3270', status: 'Deactive'},
    { id: 3, name: 'HP Envy Pro 6420', status: 'Active' },
    { id: 4, name: 'Epson WorkForce Pro WF-7310', status: 'Deactive'},
    { id: 5, name: 'Brother MFC-J5945DW', status: 'Active' },
    { id: 6, name: 'Canon MAXIFY MB2750', status: 'Active'},
    { id: 7, name: 'Canon PIXMA G1220 (G1520 in the UK)', status: 'Active' }
];
//20-80
//20-250
//0-100
// Function to generate random data
const generateMockData = () => {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * printers.length); // Generates a random index between 0 and printers.length - 1

    // Access the printer name
    const printerName = printers[randomIndex].name;
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
        heaterBedTempHistory,
        printerName
    };
};

// API endpoint to get printer status
app.get('/api/printer-status', (req, res) => {
    res.json(generateMockData());
});

// Endpoint to get printer names
app.get('/api/printers', (req, res) => {
    res.json(printers);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
