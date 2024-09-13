import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [city, setCity] = useState("Dhaka");
  const [weather, setWeather] = useState(null);
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formatedDate = `${month} ${day},${year}`;

  const API_KEY = "c24ebb344096854386380018f34db72c";
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInput = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="App">
      <div className="container">
        {weather && (
          <>
            <h1 className="container_date">{formatedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weather.name}</h2>
              <img
                src="/thunder.png"
                className="container_img"
                alt=""
                width="180px"
              />
              <h2 className="container_degree"> {(weather.main.temp - 273).toFixed(2)}</h2>
              <h2 className="country_per">{weather.weather[0].main}</h2>
              <form action="" className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter city name"
                  name=""
                  onChange={handleInput}
                />
                <button type="submit"> Get</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
