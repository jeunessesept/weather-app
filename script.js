const inputedCity = document.querySelector(".citysearch");
const buttons = document.querySelector(".searchbutton");
const grafCanvas = document.getElementById("chart");
grafCanvas.style.display = "none";

const humGraf = [];
const dayGraf = [];



const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const fetchApiWeather = () => {
  let apiKey = "19e1717bb387f246a2c44f869eeb12ff";

  const fetchWeather = (city) =>
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=` +
        apiKey
    );
  let inCity = inputedCity.value;

  fetchWeather(inCity)
    .then((response) => response.json())
    .then((json) => {
      
      // dataGraf.push(json)

      let weatherContainer = document.createElement("div");
      weatherContainer.classList.add("weather");

      let cityDiv = document.createElement("h2");
      cityDiv.classList.add("city");
      cityDiv.innerText = "Weather in " + json.city.name;

      weatherContainer.append(cityDiv);
      document.body.insertBefore(weatherContainer, grafCanvas);

      for (let i = 0; i < json.list.length; i = i + 8) {
        let elementDiv = document.createElement("div");
        elementDiv.classList.add("elementdiv");

        let daysDiv = document.createElement("div");
        daysDiv.classList.add("days");
        let date = new Date(json.list[i].dt_txt);
        daysDiv.innerHTML = weekday[date.getDay()];

        let iconDiv = document.createElement("img");
        iconDiv.classList.add("icon");
        iconDiv.src =
          "http://openweathermap.org/img/wn/" +
          json.list[0].weather[0].icon +
          "@2x.png";

        let tempDiv = document.createElement("div");
        tempDiv.classList.add("temp");
        tempDiv.innerText = Math.ceil(json.list[i].main.temp) + "°C";

        elementDiv.append(daysDiv, iconDiv, tempDiv);
        weatherContainer.appendChild(elementDiv);
        
        humGraf.push(json.list[i].main.humidity)
        dayGraf.push(json.list[i].dt_txt)
       
        
    
      }
    })
    .catch((error) => {
      console.log(error);
    });
};



const fetchPicture = () => {
  let city = inputedCity.value;
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

  // let date = new Date(dataGraf.dt_txt);

  
  const ctx = document.getElementById("chart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dayGraf,
      datasets: [
        {
          label: "% of humidity",
          data: humGraf,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
};

////////calling 

buttons.addEventListener("click", () => {
  fetchApiWeather();
  fetchPicture();
  grafCanvas.style.display = "flex";
  console.log(humGraf, dayGraf)
  grafChart();
});




// function refreshPage() {
//   window.location.reload();
// }