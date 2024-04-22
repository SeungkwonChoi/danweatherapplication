"use client"
import { useEffect, useState } from 'react';
import { get7DayWeatherForecast } from "./components/API";
import WeatherCard from "./components/WeatherCard";
import Searchbar from "./components/search-bar";

export default function Home() {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('Calgary');
  const [searchedLocation, setSearchedLocation] = useState(null);

  const fetchData = async (location) => {
    try {
      const weatherForecast = await get7DayWeatherForecast(location);
      const forecastDays = weatherForecast.forecast.forecastday;
      setForecastData(forecastDays);
      setLoading(false);
      setSearchedLocation(location);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);

      // Show an alert box with the error message
      window.alert(`Error fetching data: Enter a Proper City Name!`);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      setLoading(true);
      fetchData(searchQuery);
    }
  };

  useEffect(() => {
    // Fetch data for the default location when the component mounts
    fetchData("Calgary"); // Replace with your desired default location
  }, []);

  return (
    <main className="min-h-screen bg-blue-500 p-8">
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-10">
        Weather App
      </h1>
      <Searchbar
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <h2 className="text-center text-3xl font-extrabold text-white drop-shadow-lg mb-3 mt-3">Upcoming Weather Forecast for {searchedLocation || ""}</h2>
      <div className="flex overflow-x-auto py-4 space-x-4 items-stretch justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            
            
            {forecastData.map((forecastDay, index) => (
              <WeatherCard
                key={index}
                day={forecastDay.date}
                weather={forecastDay.day.condition.text || 'N/A'}
                temperature={forecastDay.day.avgtemp_c || 'N/A'}
                conditionCode={forecastDay.day.condition.code || 'N/A'}
              />
            ))}
          </>
        )}
      </div>
    </main>
  );
}
