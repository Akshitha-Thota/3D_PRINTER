const  sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu_bar');
const closeBtn = document.querySelector('#close_btn');


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
