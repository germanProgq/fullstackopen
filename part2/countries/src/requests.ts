import axios from 'axios';

export interface Country {
  cca3: string;
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  area: number;
  languages?: Record<string, string>;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
}

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries';

const getAll = async (): Promise<Country[]> => {
  const res = await axios.get<Country[]>(`${baseUrl}/api/all`);
  return res.data;
};

const searchCountryByName = async (name: string): Promise<Country[]> => {
  const res = await axios.get<Country[]>(`${baseUrl}/api/name/${name}`);
  return res.data;
};

export default { getAll, searchCountryByName };
