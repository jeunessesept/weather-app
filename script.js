const inputedCity = document.querySelector(".citysearch");
const buttons = document.querySelector(".searchbutton");

const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const dateAndHours = new Date();
let day = dateAndHours.getDate();
let year = dateAndHours.getFullYear();
let month = dateAndHours.getMonth();

let dateOfToday =
  weekday[dateAndHours.getDay()] +
  "  " +
  day +
  " " +
  months[dateAndHours.getMonth()] +
  " " +
  year;

const fetchApiWeather = () => {
  let apiKey = "19e1717bb387f246a2c44f869eeb12ff";

  buttons.addEventListener("click", () => {
    const fetchWeather = (city) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=` +
          apiKey
      );
    let inCity = inputedCity.value;

    fetchWeather(inCity)
      .then((response) => response.json())
      .then((json) => {

        
        let jsonList = json.list;
        let data = [];
        for (let i = 0; i < jsonList.length ; i = i + 8) {
          data.push([i]);
        }
        console.log(data);

        document.querySelector(".city").innerText =
          "Weather in " + json.city.name;
        document.querySelector(".temp").innerText =
          Math.ceil(json.list[0].main.temp) + "°C";
        document.querySelector(".date").innerHTML = dateOfToday;
        document.querySelector(".description").innerHTML =
          json.list[0].weather[0].description;
        document.querySelector(".icon").src =
          "http://openweathermap.org/img/wn/" +
          json.list[0].weather[0].icon +
          "@2x.png";
        document.querySelector(".humidity").innerHTML =
          json.list[0].main.humidity + " % of humidity";
        // document.querySelector('.wind').innerHTML = "wind speed " + json.list[0].wind.speed + " km/h";
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

const fetchApiPhotos = () => {
  let apiKey = "GZ5l_UJgVzdr3-GjchqGDOdlKHW0JonXPYGwpmhZ5T4";

  buttons.addEventListener("click", () => {
    const fetchImages = (city) =>
      fetch(
        `https://api.unsplash.com/search/photos?query=${city}&client_id=` +
          apiKey
      );

    let inCity = inputedCity.value;

    fetchImages(inCity)
      .then((response) => response.json())
      .then((json) => {});
  });
};

fetchApiWeather();
