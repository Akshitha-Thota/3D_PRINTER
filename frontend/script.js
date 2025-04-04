const  sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu_bar');
const closeBtn = document.querySelector('#close_btn');

const ctx = document.getElementById('temperatureChart').getContext('2d');
let temperatureChart;
let printersList = [];
let printerName , heaterBedTemp, extruderTemp, printProgress, printerStatus;
// Get the current date
const currentDate = new Date();

// Format the date as needed (e.g., "MM/DD/YYYY")
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = currentDate.toLocaleDateString(undefined, options);

// Display the date in the HTML
document.getElementById('current-date').textContent = `${formattedDate}`;
window.onload = async () => {
    const response = await fetch('http://localhost:3000/api/printers');
    printersList = await response.json();
    displayPrinters();
};
const displayPrinters = () => {
    const printerListElement = document.getElementById('printer-list');
    printerListElement.innerHTML = ''; // Clear existing list

    printersList.forEach(printer => {
        const tr = document.createElement('tr'); // Create a new table row
        
        // Create and populate the Printer ID cell
        const idTd = document.createElement('td');
        idTd.textContent = printer.id; // Set the cell text to the printer ID
        tr.appendChild(idTd); // Append the cell to the row

        // Create and populate the Printer Name cell
        const nameTd = document.createElement('td');
        nameTd.textContent = printer.name; // Set the cell text to the printer name
        tr.appendChild(nameTd); // Append the cell to the row

        // Create and populate the Status cell
        const statusTd = document.createElement('td');
        statusTd.textContent = printer.status; // Set the cell text to the printer status
        tr.appendChild(statusTd); // Append the cell to the row

        // Attach click event to the row
        tr.onclick = () => showGraph(printer.id); // Attach click event to the row
        printerListElement.appendChild(tr); // Append the row to the table body
    });
};

const fetchPrinterStatus = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/printer-status');
        const data = await response.json();
        extruderTemp = data.extruderTemp;
        heaterBedTemp = data.heaterBedTemp;
        printProgress = data.printProgress;
        printerName = data.printerName;
        printerStatus = data.printerStatus;

        // Update the chart with historical data
        updateChart(data.extruderTempHistory, data.heaterBedTempHistory);
        updateInsight();
    } catch (error) {
        console.error('Error fetching printer status:', error);
    }
};

function mapValue(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
const updateCircle = (circleDivName , circleValue, maxVal, minVal) =>{
    const circleDiv = document.getElementById(circleDivName);
    const normalizedVal = Math.max(minVal, Math.min(maxVal, circleValue)); // Clamp temperature
            const percentage = (normalizedVal - minVal) / (maxVal - minVal); // Calculate percentage
            const circumference = 2 * Math.PI * 30; // Circumference of the circle
            const offset = circumference * (1 - percentage); // Calculate offset

            // Set the stroke-dasharray and stroke-dashoffset for the fill circle
            circleDiv.setAttribute('stroke', getColor(circleValue,maxVal,minVal)); // Set color based on temperature
            circleDiv.setAttribute('stroke-dasharray', circumference);
            circleDiv.setAttribute('stroke-dashoffset', offset);
    // Set color based on temperature
   /* if (circleValue < (maxVal-minVal)/3) {
        circleDiv.setAttribute('fill', 'blue'); // Cold
    } else if (circleValue > 2*(maxVal-minVal)/3) {
        circleDiv.setAttribute('fill', 'red'); // Hot
    } else {
        circleDiv.setAttribute('fill', 'yellow'); // Moderate
    }*/
};
function getColor(circleValue,maxVal,minVal) {
    if (circleValue < (maxVal-minVal)/3) {
        return 'blue';// Cold
    } else if (circleValue > 2*(maxVal-minVal)/3) {
        return 'red'; // Hot
    } else {
        return 'yellow'; // Moderate
    }
}
const updateInsight = () => {
    updateCircle('heater-circle',heaterBedTemp,80,20);
    document.getElementById('extruder-temp-insight').innerHTML = "<p>"+extruderTemp+"<\p>";
    document.getElementById('heater-bed-temp-insight').innerHTML = "<p>"+heaterBedTemp+"<\p>";  
    document.getElementById('pi-insight').innerHTML = "<p>"+printProgress+"<\p>";
    document.getElementById('printer-name-insight').innerText = printerName;
};
const updateChart = (extruderHistory, heaterHistory) => {
    
    document.getElementById('extruder-temperature').innerText = extruderTemp;
    document.getElementById('heater-bed-temperature').innerText = heaterBedTemp;  
    document.getElementById('print-progress-percentage').innerText = printProgress;
    document.getElementById('printer-status').innerText = printerStatus;
    document.getElementById('printer-name').innerText = printerName;
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

// const extruderTemperatureElement = document.getElementById('extruderTemperature');
// const heaterBedTemperatureElement = document.getElementById('heaterBedTemperature');
// const printProgressPercentageElement = document.getElementById('printProgressPercentage');
// const printerStatusElement = document.getElementById('printerStatus');

// const fetchPrinterStatus = async () => {
//   try {
//     const response = await fetch('http://raspberrypi.local:3000/api/printer-status');
//     const printerData = await response.json();
//     extruderTemperatureElement.innerText = printerData.extruderTemp;
//     heaterBedTemperatureElement.innerText = printerData.heaterBedTemp;
//     printProgressPercentageElement.innerText = printerData.printProgress;
//     printerStatusElement.innerText = printerData.printerStatus;
//   } catch (error) {
//     console.error('Error fetching printer status from Raspberry Pi:', error);
//   }
// };

// setInterval(fetchPrinterStatus, 2000);


const themeToggler = document.querySelector('.theme-toggler');



menuBtn.addEventListener('click',()=>{
       sideMenu.style.display = "block"
})
closeBtn.addEventListener('click',()=>{
    sideMenu.style.display = "none"
})

themeToggler.addEventListener('click',()=>{
     document.body.classList.toggle('dark-theme-variables')
     themeToggler.querySelector('span:nth-child(1').classList.toggle('active')
     themeToggler.querySelector('span:nth-child(2').classList.toggle('active')
})
