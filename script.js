const tempDisplay = document.getElementById("temperature");
const humidityDisplay = document.getElementById("humidity");
const gasDisplay = document.getElementById("gas");
const countDisplay = document.getElementById("count");
const fanStatusDisplay = document.getElementById("fanStatus");
const statusDisplay = document.getElementById("status");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

const tempData = {
  labels: [],
  datasets: [{
    label: "🌡️ Temperature (°C)",
    borderColor: "#ff4f8b",
    backgroundColor: "#ff4f8b44",
    data: [],
    fill: true
  }]
};

const humidityData = {
  labels: [],
  datasets: [{
    label: "💧 Humidity (%)",
    borderColor: "#00bfff",
    backgroundColor: "#00bfff44",
    data: [],
    fill: true
  }]
};

const gasData = {
  labels: [],
  datasets: [{
    label: "🔥 Gas Level",
    borderColor: "green",
    backgroundColor: "rgba(0,255,0,0.1)",
    data: [],
    fill: true
  }]
};

const tempChart = new Chart(document.getElementById("tempChart"), {
  type: "line",
  data: tempData,
  options: { scales: { y: { beginAtZero: true } } }
});

const humidityChart = new Chart(document.getElementById("humidityChart"), {
  type: "line",
  data: humidityData,
  options: { scales: { y: { beginAtZero: true } } }
});

const gasChart = new Chart(document.getElementById("gasChart"), {
  type: "line",
  data: gasData,
  options: { scales: { y: { suggestedMin: 0, suggestedMax: 1024 } } }
});

function simulateData() {
  const now = new Date().toLocaleTimeString();
  const temp = parseFloat((10 + Math.random() * 30).toFixed(1));
  const hum = parseFloat((40 + Math.random() * 10).toFixed(1));
  const gas = Math.floor(300 + Math.random() * 400); // Simulated gas level
  const count = Math.floor(Math.random() * 5); // Simulated people count
  const fanStatus = temp > 28 || gas > 600 ? "ON" : "OFF"; // Example logic

  if (tempData.labels.length > 10) {
    [tempData, humidityData, gasData].forEach(data => {
      data.labels.shift();
      data.datasets[0].data.shift();
    });
  }

  [tempData, humidityData, gasData].forEach(data => data.labels.push(now));
  tempData.datasets[0].data.push(temp);
  humidityData.datasets[0].data.push(hum);
  gasData.datasets[0].data.push(gas);

  tempDisplay.textContent = temp;
  humidityDisplay.textContent = hum;
  gasDisplay.textContent = gas;
  countDisplay.textContent = count;
  fanStatusDisplay.textContent = fanStatus;

  statusDisplay.classList.remove("cold", "hot", "normal");
  if (temp < 15) {
    statusDisplay.textContent = "Cold";
    statusDisplay.classList.add("cold");
  } else if (temp > 30) {
    statusDisplay.textContent = "Hot";
    statusDisplay.classList.add("hot");
  } else {
    statusDisplay.textContent = "Normal";
    statusDisplay.classList.add("normal");
  }

  tempChart.update();
  humidityChart.update();
  gasChart.update();
}

setInterval(simulateData, 2000);

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
});
