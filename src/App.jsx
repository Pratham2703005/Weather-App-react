import React, { useState, useEffect } from "react";
import Navbar from "../src/components/navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import axios from "axios";

// Loader Component
const Loader = () => (
  <div className="flex justify-center items-center h-[100vh] ">
    <img src="/loader.gif" alt="" className="h-56"/>
  </div>
);

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false); // To track loading state

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = import.meta.env.VITE_REACT_WEATHER_API; 
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then((response) => {
        setAirQualityData(response.data.list[0]);
      })
      .catch((error) => console.error("Error fetching the air quality data:", error));
  };

  const fetchWeatherData = (city) => {
    const API_KEY = "d4adf20e0f06dd329d60cd20157d541f"; 
    setLoading(true); // Start loading
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          setCityNotFound(true);
          // setLoading(false); // Stop loading
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setWeatherData(data);
          fetchAirQualityData(data.coord.lat, data.coord.lon);
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
            )
            .then((response) => {
              setFiveDayForecast(response.data);
              setLoading(false); // Stop loading
            })
            .catch((error) => {
              console.error("Error fetching the 5-day forecast data:", error);
              setLoading(false); // Stop loading
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching the weather data:", error);
        setCityNotFound(true);
        setLoading(false); // Stop loading
      });
  };

  const handleSearch = (searchedCity) => {
    setCityNotFound(false); // Reset error on new search
    setCity(searchedCity);
  };

  const fetchCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      setLoading(true); // Start loading
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherDataByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location: ", error);
          setLoading(false); // Stop loading
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const fetchWeatherDataByCoordinates = (lat, lon) => {
    const API_KEY = "d4adf20e0f06dd329d60cd20157d541f"; 
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
          )
          .then((response) => {
            setFiveDayForecast(response.data);
            setLoading(false); // Stop loading
          })
          .catch((error) => {
            console.error("Error fetching the 5-day forecast data:", error);
            setLoading(false); // Stop loading
          });
      })
      .catch((error) => {
        console.error("Error fetching the weather data:", error);
        setLoading(false); // Stop loading
      });
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <Navbar handleSearch={handleSearch} fetchCurrentLocationWeather={fetchCurrentLocationWeather} />

      {loading ? (
        <Loader /> // Show loader while fetching data
      ) : cityNotFound ? (
        <div className="text-center text-red-500 font-semibold mt-10">
          <h2 className="text-4xl">No City Found</h2>
          <p className="text-lg mt-2">Please try searching for a valid city.</p>
        </div>
      ) : (
        weatherData && airQualityData && (
          <div className="flex flex-col md:flex-row px-8 py-6 gap-8 w-[100vw] h-[90vh]">
            <div className="flex-1 space-y-6 w-[30%]">
              <MainWeatherCard weatherData={weatherData} />
              <div className="bg-gray-800 rounded-lg p-6 h-[37vh]">
                <h2 className="text-2xl font-semibold mb-4">5-Day Forecast</h2>
                {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
              </div>
            </div>

            <div className="flex flex-col flex-0.5 gap-6 h-full w-[70%]">
              <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherDashboard;
