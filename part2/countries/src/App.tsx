import { useEffect, useMemo, useState } from 'react';
import Search from './components/Search';
import request, { type Country } from './requests.ts';
import './App.css';

const CountryDetails = ({ country }: { country: Country }) => {
  const [shownCountry, setShownCountry] = useState<Country | null>(null);
  const languages = country.languages ? Object.values(country.languages) : [];

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        Capital:{' '}
        {country.capital && country.capital.length > 0
          ? country.capital.join(', ')
          : 'Unknown'}
      </p>
      <p>Area: {country.area.toLocaleString()} km²</p>
      <h3>Languages</h3>
      {languages.length > 0 ? (
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      ) : (
        <p>Languages not available.</p>
      )}
      <img
        src={country.flags.svg || country.flags.png}
        alt={country.flags.alt || `Flag of ${country.name.common}`}
        width={200}
      />
    </div>
  );
};

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

  const normalizedFilter = filter.trim().toLowerCase();
  const filteredCountries = useMemo(
    () =>
      normalizedFilter
        ? countries.filter((country) =>
            country.name.common.toLowerCase().includes(normalizedFilter),
          )
        : [],
    [countries, normalizedFilter],
  );

  const renderCountries = () => {
    if (!normalizedFilter) return null;
    if (filteredCountries.length > 10)
      return <p>Too many matches, specify another filter.</p>;
    if (filteredCountries.length === 0) return <p>No countries found.</p>;
    if (filteredCountries.length === 1)
      return <CountryDetails country={filteredCountries[0]} />;

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
