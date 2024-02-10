import React, { useState, ChangeEvent, ReactElement } from 'react';
import CountryService from '../../services/countryService';
import Country from '../../interfaces/Country';
import styles from './autocomplete.module.css'

interface AutocompleteProps {
  onSelect: (selectedOption: Country | null) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedInputValue, setSelectedInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setFilteredOptions([]);
      onSelect(null);
      return;
    }

    setLoading(true);

    const countries = await CountryService.fetchCountryData(value);

    setFilteredOptions(countries || []);
    setLoading(false);
  };

  const handleSelectOption = (selectedOption: Country): void => {
    setInputValue(selectedOption.name);
    setSelectedInputValue(selectedOption.name)
    setFilteredOptions([]);
    onSelect(selectedOption);
  };

  const highlightMatch = (text: string, query: string): ReactElement => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) {
      return <>{text}</>;
    }

    return (
      <>
        {text.substring(0, index)}
        <strong>{text.substring(index, index + query.length)}</strong>
        {text.substring(index + query.length)}
      </>
    );
  };

  const renderOptions = (): ReactElement[] => {
    return filteredOptions.map((item, key) => (
      <div key={key} onClick={() => handleSelectOption(item)} className={styles.countryOption}>
        <img src={item.flag.png} alt="" className={styles.countryOptionFlag} />
        <span>{highlightMatch(item.name, inputValue)}</span>
      </div>
    ));
  };

  return (
    <div className={styles.formGroup}>
      <input
        name="country"
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
        placeholder="Type to search..."
        className={styles.autocomplete}
      />
      <div className={styles.countriesList}>
        {loading && <div>Loading...</div>}
        {(JSON.stringify(filteredOptions) === '[]' && !loading && inputValue && selectedInputValue !== inputValue) && <div>No countries found</div>}
        {renderOptions()}
      </div>
    </div>
  );
};

export default Autocomplete;