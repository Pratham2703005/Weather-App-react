import React from "react";

const FiveDayForecast = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  return (
    <div className="bg-gray-700 text-gray-100 rounded-lg p-4 shadow-md space-y-4 h-[30vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-400 scrollable">
        {forecastData.list
          .filter((item, index) => index % 8 === 0) // Selecting one item for each day
          .slice(0, 5)
          .map((item, index) => (
            <div
              key={index}
              className=" rounded-lg grid grid-cols-3 place-items-center py-1 "
            >
              <div className="text-lg font-bold">{Math.round(item.main.temp)}°C</div>
              <div className="text-sm font-medium text-gray-300">
                {formatDate(item.dt_txt)}
              </div>
              <div className="text-sm capitalize text-gray-400">
                {item.weather[0].description}
              </div>
            </div>
          ))}
      </div>
  );
};

export default FiveDayForecast;
