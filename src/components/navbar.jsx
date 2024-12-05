import React, { useState } from "react";
import { TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterDramaTwoToneIcon from "@mui/icons-material/FilterDramaTwoTone";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

const Navbar = ({ handleSearch,fetchCurrentLocationWeather }) => {
  const [searchCity, setSearchCity] = useState("");

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      handleSearch(searchCity);
    }
  };

  return (
    <nav className="flex justify-between items-center py-3 px-6 bg-gray-800 text-white">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <FilterDramaTwoToneIcon className="text-teal-300" />
        <p className="text-xl font-semibold">Weather</p>
      </div>

      {/* Search Bar Section */}
      <div className="flex items-center gap-6">
        <TextField
          variant="outlined"
          placeholder="Search city, e.g., 'Delhi'"
          size="small"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="w-80 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="text-teal-500"/>
              </InputAdornment>
            ),
          }}
          inputProps={{
            style: {
              color: 'white', // Color for the input text
            }
          }}
          InputLabelProps={{
            style: {
              color: 'white', // Color for the label
            }
          }}
          sx={{
            'input::placeholder': {
              color: 'white', // Placeholder color
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearchClick}
          className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-2 shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Search
        </Button>
      </div>



      {/* Current Location Section */}
      <div
        onClick={fetchCurrentLocationWeather}
        className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 cursor-pointer px-4 py-2 rounded-md"
      >
        <GpsFixedIcon />
        <p className="text-sm font-medium">Current Location</p>
      </div>
    </nav>
  );
};

export default Navbar;
