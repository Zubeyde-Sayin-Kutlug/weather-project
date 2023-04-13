import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Weather() {
  // const apiKey = "BSLH7JTG67QKHJTAQ89SE7RSP";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("London");
  const [errorOcurred, setErrorOcurred] = useState(false);
  const navigate = useNavigate();

  const getWeather = (event) => {
    if (event.key === "Enter") {
      setErrorOcurred(false);
      fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=BSLH7JTG67QKHJTAQ89SE7RSP`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.cod !== "404") {
            setWeatherData(data);
            setCity("");
          } else {
            setErrorOcurred(true);
          }
        });
    }
  };
  const getWeatherClick = (event) => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=BSLH7JTG67QKHJTAQ89SE7RSP`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        // console.log(data);
        setCity("");
      });
  };
  useEffect(() => {
    getWeatherClick("London");
  }, []);

  return (
    <div className="body-image">
      <div className="container">
        <input
          className="input"
          placeholder="Enter City..."
          onChange={(e) => setCity(e.target.value)}
          value={city}
          name="city"
          onKeyPress={getWeather}
          autoFocus
        />
        <div>
          <button className="submit" type="button" onClick={getWeatherClick}>
            Search
          </button>
        </div>

        {errorOcurred ? (
          { message: alert("Not Found"), city: city }
        ) : (
          <>
            {typeof weatherData.resolvedAddress == "undefined" ? (
              <div>
                <p>
                  Welcome to weather app! Enter in a city to get the weather of.
                </p>
              </div>
            ) : (
              <div className="weather-data">
                <div>
                  <img
                    src="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?iconSet=icons1&aggregateHours=24&combinationMethod=aggregate&shortColumnNames=true&contentType=json&unitGroup=metric&locationMode=single&locations=49.1791,-122.3161&forecastDays=7&key=BSLH7JTG67QKHJTAQ89SE7RSP"
                    alt=""
                  />
                </div>

                <p className="city">{weatherData.address}</p>
                <p className="date">{weatherData.days[0].datetime}</p>
                <p className="temp">{Math.round(weatherData.days[0].temp)}°C</p>
                <p className="weather">{weatherData.days[0].conditions}</p>
                <p className="humidity">{weatherData.days[0].humidity}</p>
              </div>
            )}
          </>
        )}

        <button
          className="button"
          onClick={() => {
            localStorage.removeItem("zubeydes");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Weather;
