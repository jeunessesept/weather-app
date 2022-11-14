const cityForm = document.getElementById("cityform");
const grafCanvas = document.getElementById("chart");
grafCanvas.style.display = "none";

data = JSON.parse(localStorage.getItem("city")) || []
humGraf = [];
dayGraf = [];
tempGraf = [];

const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const fetchCityData = async () => {
  let city = document.getElementById("city").value;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=19e1717bb387f246a2c44f869eeb12ff`
  );

  const data = await response.json();

  localStorage.setItem("city", JSON.stringify(city));

  return data;
}

const addWeatherRow = () => {
  let weatherContainer = document.createElement("div");
  weatherContainer.classList.add("weather");

  let cityDiv = document.createElement("h2");
  cityDiv.classList.add("city");
  cityDiv.innerText = "Weather in " + data.city.name;

  weatherContainer.append(cityDiv);
  document.body.insertBefore(weatherContainer, grafCanvas);

  for (let i = 0; i < data.list.length; i = i + 8) {
    let elementDiv = document.createElement("div");
    elementDiv.classList.add("elementdiv");

    let daysDiv = document.createElement("div");
    daysDiv.classList.add("days");
    let date = new Date(data.list[i].dt_txt);
    daysDiv.innerHTML = weekday[date.getDay()];

    let iconDiv = document.createElement("img");
    iconDiv.classList.add("icon");
    iconDiv.src =
      "http://openweathermap.org/img/wn/" +
      data.list[0].weather[0].icon +
      "@2x.png";

    let tempDiv = document.createElement("div");
    tempDiv.classList.add("temp");
    tempDiv.innerText = Math.ceil(data.list[i].main.temp) + "°C";

    elementDiv.append(daysDiv, iconDiv, tempDiv);
    weatherContainer.appendChild(elementDiv);
  }
};

const fetchPicture = () => {
  let city = document.getElementById("city").value;
  fetch(
    "https://api.unsplash.com/search/photos?&client_id=GZ5l_UJgVzdr3-GjchqGDOdlKHW0JonXPYGwpmhZ5T4&query=%22" +
      city
  )
    .then((response) => response.json())
    .then((json) => {
      let picturesArray = json.results;
      let item =
        picturesArray[Math.floor(Math.random() * picturesArray.length)];
      document.body.style.background = `url(${item.urls.regular}) no-repeat center`;
      document.body.style.backgroundSize = "cover";
    });
};

const grafChart = () => {
  for (let i = 0; i < data.list.length; i++) {
    humGraf.push(data.list[i].main.humidity);
    dayGraf.push(data.list[i].dt_txt);
    tempGraf.push(data.list[i].main.temp);
  }

  const ctx = document.getElementById("chart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dayGraf,
      datasets: [
        {
          label: "% of humidity",
          data: humGraf,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 2,
        },
        {
          label: "temperature every 3hours",
          data: tempGraf,
          backgroundColor: ["rgba(245, 238, 39, 1)"],
          borderColor: ["rgba(245, 238, 39, 1)"],
          borderWidth: 2,
        },
      ],
    },
  });
};

cityForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  grafCanvas.style.display = "flex";
  data = await fetchCityData();
  addWeatherRow();
  fetchPicture();
  grafChart();
});
