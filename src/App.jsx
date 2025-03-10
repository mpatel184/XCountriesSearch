import { useEffect, useState } from 'react'
import axios from "axios"
import "tailwindcss"

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const fetchData = async() => {
    try {
      const response = await axios.get("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      setCountries(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(() => {
    fetchData()
  },[])

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for countries..."
          className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {filteredCountries.map((country, index) => {
          const { common, png } = country;
          return (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-md shadow-md flex flex-col items-center"
            >
              <img
                src={png}
                alt={common}
                className="w-20 h-14 object-cover mb-2 border rounded-md"
              />
              <h2 className="text-lg font-semibold">{common}</h2>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default App
