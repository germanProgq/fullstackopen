import { type ChangeEvent } from 'react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange }: SearchProps) => {
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search countries"
      value={value}
      onChange={handleSearchInput}
    />
  );
};

export default Search;
