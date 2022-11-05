const inputedCity = document.querySelector(".citysearch");
const buttons = document.querySelector(".searchbutton");
const weatherContainer = document.querySelector(".weather");
weatherContainer.style.visibility = "hidden";

const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];


const fetchApiWeather = () => {
  let apiKey = "19e1717bb387f246a2c44f869eeb12ff";

  weatherContainer.style.visibility = "visible";

  const fetchWeather = (city) =>
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=` +
        apiKey
    );
  let inCity = inputedCity.value;

  fetchWeather(inCity)
    .then((response) => response.json())
    .then((json) => {
      document.querySelector(".city").innerText =
        "Weather in " + json.city.name;

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
      }
    })
    .catch((error) => {
      console.log(error);
    });
};



const fetchPicture =() => {
   
    
   let city = inputedCity.value
    fetch("https://api.unsplash.com/search/photos?&client_id=GZ5l_UJgVzdr3-GjchqGDOdlKHW0JonXPYGwpmhZ5T4&query=%22" + city )
      .then((response) => response.json())
      .then((json) => {
        console.log(json.results)
        let picturesArray = json.results;
        let item = picturesArray[Math.floor(Math.random()*picturesArray.length)]
        console.log(item.urls.regular)
        document.body.style.background = `url(${item.urls.regular}) no-repeat center`;
        document.body.style.backgroundSize = "cover";
        
      });
}
  
 



buttons.addEventListener("click", (event) => {
  event.preventDefault();
  fetchApiWeather();
  fetchPicture();
});

