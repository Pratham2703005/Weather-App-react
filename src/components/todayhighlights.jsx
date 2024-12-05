import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompressIcon from "@mui/icons-material/Compress";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

const TodayHighlights = ({ weatherData, airQualityData }) => {
  const { main, wind, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi;
  const { co, no, no2, o3 } = airQualityData?.components || {};

  const airQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return { text: "Good", color: "bg-green-500" };
      case 2:
        return { text: "Fair", color: "bg-lime-500" };
      case 3:
        return { text: "Moderate", color: "bg-yellow-500" };
      case 4:
        return { text: "Poor", color: "bg-orange-500" };
      case 5:
        return { text: "Very Poor", color: "bg-red-500" };
      default:
        return { text: "Unknown", color: "bg-gray-500" };
    }
  };

  const highlights = [
    { title: "Humidity", value: `${main.humidity}%`, Icon: InvertColorsIcon },
    { title: "Pressure", value: `${main.pressure} hPa`, Icon: CompressIcon },
    { title: "Visibility", value: `${visibility / 1000} km`, Icon: VisibilityIcon },
    { title: "Feels Like", value: `${main.feels_like}°C`, Icon: DeviceThermostatIcon },
  ]; 

  return (
    <div className="bg-gray-800 text-gray-100 rounded-lg p-6 shadow-md h-full w-full">
      <h2 className="text-xl font-bold mb-4">Today's Highlights</h2>
      <div className="gap-3 space-y-5 mt-9 ">
      {/* Air Quality & Sunrise/Sunset */}
      <div className="bg-gray-700 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-600 pb-2">
            <h3 className="text-lg font-medium">Air Quality Index</h3>
            <span
              className={`text-sm font-bold px-2 py-1 rounded ${airQualityDescription(airQualityIndex).color}`}
            >
              {airQualityDescription(airQualityIndex).text}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <AirIcon className="text-blue-300 text-3xl" />
            <div className="flex justify-between text-center w-full mx-14">
              {[
                { label: "CO", value: co },
                { label: "NO", value: no },
                { label: "NO₂", value: no2 },
                { label: "O₃", value: o3 },
              ].map((item, index) => (
                <div key={index}>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm">{item.value ? `${item.value} µg/m³` : "N/A"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sunrise & Sunset */}
        <div className="bg-gray-700 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-medium border-b border-gray-600 pb-2">Sunrise And Sunset</h3>
          <div className="flex justify-around items-center">
            <div className="text-center">
              <WbSunnyIcon className="text-yellow-400 text-4xl" />
              <p className="mt-2 text-sm font-medium">
                {new Date(sys.sunrise * 1000).toLocaleTimeString()}
              </p>
            </div>
            <div className="text-center">
              <NightsStayIcon className="text-blue-400 text-4xl" />
              <p className="mt-2 text-sm font-medium">
                {new Date(sys.sunset * 1000).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

      {/* Highlights Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-gray-600">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex flex-col items-center p-4 bg-gray-700 rounded-lg">
            <highlight.Icon className="text-gray-400 text-3xl mb-2" />
            <p className="font-medium text-sm">{highlight.title}</p>
            <p className="text-lg font-bold">{highlight.value}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default TodayHighlights;
