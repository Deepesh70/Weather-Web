import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    setWeather(null);
    setError(null);

    try {
     
      const response = await fetch(`http://localhost:5000/api/weather?city=${city}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not fetch weather data.');
      }

      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-gray-900 flex flex-col items-center justify-center font-sans p-4 text-white'>
      <div className='bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-lg border border-white/20'>
        <h1 className='text-3xl md:text-4xl font-bold text-center mb-6 tracking-wide'>
          Weather Forecast
        </h1>

        <form onSubmit={getWeather} className='flex mb-6 shadow-md rounded-lg'>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className='flex-grow p-3 rounded-l-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-black/30 text-white placeholder-gray-300 transition-shadow'
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-r-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center w-14"
          >
        
            <FiSearch size={22} />
          </button>
        </form>

        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
        
        {error && (
          <p className="bg-red-500/50 text-center p-3 rounded-lg animate-pulse">
            Please enter a valid city name.
          </p>
        )}

        {weather && (
          <div className="text-white text-center bg-black/20 p-6 rounded-xl animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold">{weather.name}, {weather.sys.country}</h2>
            
            <div className="flex items-center justify-center my-4">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
                className="w-28 h-28"
              />
              <p className="text-5xl md:text-6xl font-bold ml-4">{Math.round(weather.main.temp)}°C</p>
            </div>

            <p className="text-xl capitalize mb-6">{weather.weather[0].description}</p>

            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="bg-white/10 p-4 rounded-lg flex flex-col items-center">

                <WiHumidity size={40} className="opacity-80"/>
                <p className="font-semibold mt-1">{weather.main.humidity}%</p>
                <p className="text-sm opacity-80">Humidity</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg flex flex-col items-center">
                <WiStrongWind size={40} className="opacity-80"/>
                <p className="font-semibold mt-1">{weather.wind.speed} m/s</p>
                <p className="text-sm opacity-80">Wind Speed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;