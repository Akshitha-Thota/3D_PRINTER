const ctx = document.getElementById('temperatureChart').getContext('2d');
let temperatureChart;

const fetchPrinterStatus = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/printer-status');
        const data = await response.json();
        document.getElementById('extruder-temperature').innerText = data.extruderTemp;
        document.getElementById('heater-bed-temperature').innerText = data.heaterBedTemp;
        document.getElementById('print-progress-percentage').innerText = data.printProgress;
        document.getElementById('printer-status').innerText = data.printerStatus;

        // Update the chart with historical data
        updateChart(data.extruderTempHistory, data.heaterBedTempHistory);
    } catch (error) {
        console.error('Error fetching printer status:', error);
    }
};

const updateChart = (extruderHistory, heaterHistory) => {
    if (temperatureChart) {
        temperatureChart.data.labels = Array.from({ length: extruderHistory.length }, (_, i) => i + 1);
        temperatureChart.data.datasets[0].data = extruderHistory;
        temperatureChart.data.datasets[1].data = heaterHistory;
        temperatureChart.update();
    } else {
        temperatureChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: extruderHistory.length }, (_, i) => i + 1),
                datasets: [
                    {
                        label: 'Extruder Temperature',
                        data: extruderHistory,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        fill: false
                    },
                    {
                        label: 'Heater Bed Temperature',
                        data: heaterHistory,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        fill: false
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
};

// Update the dashboard every 2 seconds
setInterval(fetchPrinterStatus, 2000);

