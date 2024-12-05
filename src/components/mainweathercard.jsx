import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Hot weather icon
import AcUnitIcon from '@mui/icons-material/AcUnit'; // Cold weather icon
import CloudIcon from '@mui/icons-material/Cloud'; // Moderate weather icon

const MainWeatherCard = ({ weatherData }) => {
  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      })
    : "Date not available";

  const renderTemperatureIcon = () => {
    if (temperatureCelsius > 23) {
      return <WbSunnyIcon className="text-yellow-400 text-5xl" />;
    } else if (temperatureCelsius < 10) {
      return <AcUnitIcon className="text-blue-400 text-5xl" />;
    } else {
      return <CloudIcon className="text-gray-300 text-5xl" />;
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 rounded-lg p-6 max-w-lg mx-auto shadow-md">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Current Weather</h2>
        <p className="text-gray-400 text-sm">{currentDate}</p>
      </div>

      {/* Temperature and Description */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-6xl font-extrabold">{temperatureCelsius}°C</p>
          <p className="capitalize text-lg text-gray-300">{weatherDescription}</p>
        </div>
        {renderTemperatureIcon()}
      </div>

      {/* Location */}
      <div className="bg-gray-700 rounded-lg p-4 flex items-center gap-4">
        <LocationOnIcon className="text-blue-400 text-3xl" />
        <div>
          <p className="text-lg font-semibold">{cityName}</p>
          <p className="text-sm text-gray-400">{countryName}</p>
        </div>
      </div>
    </div>
  );
};

export default MainWeatherCard;
