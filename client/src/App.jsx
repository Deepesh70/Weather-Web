import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [err, setError] = useState(null);
  const [loading, setloading ] = useState(false);

  const getWeather = async (e) => {
    e.preventDefault();
    if(!city) return;

    setloading(true);
    setWeather(null);
    setError(null);

    try{
      const response = await fetch(`http://localhost:5000/api/weather?city=${city}`);
      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message || 'Could not fetch weather data.');
      }
      
      setWeather(data);
    }catch(err){
      setError(err.message);
    }finally{
      setloading(false);
    }
  };


  return(
    <div className='min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex-col items-center jsutify-center fontn-sans p-4'>
      <div className='bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg p-8 w-full max-w-md'>
        <h1 className='text-4xl font-bold text-center mb-6'>Weather App</h1>

        <form onSubmit={getWeather} className='flex mb-6'>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className='flex-grow p-3 rounded-l-lg border-none focus:outline-nono bg-black bg-opacity-20 text-white placeholder-gray-300'
           />
           <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-r-lg transition-colors"
          >
            Get Weather
          </button>

          

        </form>

        {loading && <p className='text-white text-center'>Loading...</p>}
        {/* {error && <p className="bg-red-500 bg-opacity-70 text-white text-center p-3 rounded-lg">{error}</p>} */}

        {weather && (
           <div className="text-white text-center bg-black bg-opacity-20 p-6 rounded-lg">
            <h2>{weather.name}, {weather.sys.country}</h2>
            </div>
        )}
      </div>

    </div>
  )
}


export default App