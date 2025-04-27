const tempDisplay = document.getElementById("temperature");
const humidityDisplay = document.getElementById("humidity");
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

const tempChart = new Chart(document.getElementById("tempChart"), {
  type: "line",
  data: tempData,
  options: {
    scales: {
      y: { beginAtZero: true }
    }
  }
});

const humidityChart = new Chart(document.getElementById("humidityChart"), {
  type: "line",
  data: humidityData,
  options: {
    scales: {
      y: { beginAtZero: true }
    }
  }
});

function simulateData() {
  const now = new Date().toLocaleTimeString();
  const temp = parseFloat((10 + Math.random() * 30).toFixed(1));
  const hum = parseFloat((40 + Math.random() * 10).toFixed(1));

  if (tempData.labels.length > 10) {
    tempData.labels.shift();
    tempData.datasets[0].data.shift();
    humidityData.labels.shift();
    humidityData.datasets[0].data.shift();
  }

  tempData.labels.push(now);
  tempData.datasets[0].data.push(temp);
  humidityData.labels.push(now);
  humidityData.datasets[0].data.push(hum);

  tempDisplay.textContent = temp;
  humidityDisplay.textContent = hum;

  statusDisplay.classList.remove("cold", "hot", "normal");
  if (temp < 15) {
    statusDisplay.textContent = "Cold";
    statusDisplay.classList.add("cold");
  } else if (temp > 32) {
    statusDisplay.textContent = "Hot";
    statusDisplay.classList.add("hot");
  } else {
    statusDisplay.textContent = "Normal";
    statusDisplay.classList.add("normal");
  }

  tempChart.update();
  humidityChart.update();
}

setInterval(simulateData, 2000);

// Theme switching
themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      body.classList.add("light");
    } else {
      body.classList.remove("light");
      body.classList.add("dark");
    }
  });
  