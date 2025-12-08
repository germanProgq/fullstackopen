import { useEffect, useState } from 'react';
import Search from './components/Search';
import request, { type Country } from './requests.ts';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const allCountries = await request.getAll();
        setCountries(allCountries);
      } catch (err) {
        setError('Unable to load countries right now.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase()),
      )
    : [];

  const renderCountries = () => {
    if (!filter) return null;
    if (filteredCountries.length > 10)
      return <p>Too many matches, specify another filter.</p>;
    if (filteredCountries.length === 0) return <p>No countries found.</p>;

    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      console.log(country.languages?.swe);
      return (
        <>
          <h1>{country.name.common}</h1>
          <ul>
            <li>Capital: {country.capital}</li>
            <li>Area: {country.area}</li>
          </ul>
          <h2>Languages</h2>
          <ul>
            {/* {country.languages} */}
          </ul>
        
        </>
      )
    }

    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca3}>{country.name.common}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>Country search</h1>
      <Search value={filter} onChange={setFilter} />
      {loading && <p>Loading countries...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && renderCountries()}
    </div>
  );
};

export default App;
