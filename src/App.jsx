import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  let [input, setInput] = useState("karachi");
  let [weather, setWeather] = useState(null);
  let [error, setError] = useState(null);

  async function weatherInformaion() {
    try {
      let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=9505fd1df737e20152fbd78cdb289b6a`);
      let jsonData = await api.json();

      if (jsonData.cod === 200) {
        setWeather(jsonData);
        setError(null);
     
        setInput("")


     
      } else {
        setError(jsonData.message);
        setWeather(null);
      }
    } catch (error) {
      console.log("Error=", error);
      setError("Failed to fetch weather data");
      setWeather(null);
    }

        setInput("");
  }

  useEffect(() => {
    weatherInformaion();
    
    
  }, []);




  if (error) {
    return (
      <main>
        <div className="form">
          <input
            type="text"
            id="name"
            autoComplete="off"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => weatherInformaion()}>
          <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="div">

      
       <img src="https://cdn-icons-png.flaticon.com/128/622/622669.png" alt=""  className="errorglass"/>
        <p className="error">{error}</p>
        </div>
      </main>
    );
  }

  if (!weather) {
    console.log("Data Fetching");
    return null;
  }



  return (
    <>
      <main>
        <div className="form">
          <input
            type="text"
            value={input}
            id="name"
            autoComplete="off"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => weatherInformaion()}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <section className="result">
          <figure className="name">
            <figcaption>{weather.name}</figcaption>

            <img src={`https://flagsapi.com/${weather.sys.country}/flat/64.png`} className="flag" />
          </figure>

          <figure className="temperature">
            <figcaption></figcaption>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            />
            <figcaption>
              <span> {Math.round(weather.main.temp)}</span>
              <sup>°</sup>
            </figcaption>
          </figure>
          <p className="description">{weather.weather[0].description}</p>
          <ul>
            <li>
              <span>clouds</span>
              <i className="fa-solid fa-cloud" />
              <span id="clouds">{weather.clouds.all}</span>%
            </li>
            <li>
              <span>humidity</span>
              <i className="fa-solid fa-droplet" />
              <span id="humidity">{weather.main.humidity}</span>%
            </li>
            <li>
              <span>pressure</span>
              <i className="fa-solid fa-gauge" />
              <span id="pressure">{weather.main.pressure}</span>hPa
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;
