import { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
      );
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for countries..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {filteredCountries.map((country, index) => {
          const { common, png } = country;
          return (
            <div
              key={index}
              className="countryCard p-4 border border-gray-300 rounded-lg shadow-md flex flex-col items-center text-center w-[200px] h-[200px] bg-white"
            >
              <img
                src={png}
                alt={common}
                className="w-24 h-16 object-cover mb-2 border rounded-md"
              />
              <h2 className="text-lg font-semibold">{common}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
