const inputedCity = document.querySelector(".citysearch");
const buttons = document.querySelector(".searchbutton");


const fetchApi = () => {
    let apiKey = "19e1717bb387f246a2c44f869eeb12ff";

  
    buttons.addEventListener("click", () => {
    const fetchWeather = (city) => 
      fetchWeather(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=19e1717bb387f246a2c44f869eeb12ff`
      )

      let inCity = inputedCity.value;

      fetchWeather(inCity)
      .then((response) => console.log(response.json()));
   
  });
};

fetchApi()
