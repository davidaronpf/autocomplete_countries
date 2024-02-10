import React, { useState } from 'react';
import Autocomplete from '../components/autocomplete/autocomplete';
import Country from '../interfaces/Country';
import earthImg from '../assets/earth.png';
import spaceImg from '../assets/space.png';
import '../styles/App.css';


function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>();

  const handleSelect = (selectedOption: Country | null): void => {
    setSelectedCountry(selectedOption);
  };

  return (
    <div className="App">
      <img src={spaceImg} className='Back-space' alt="Space" />
      <header className="App-header">
        <div className="Earth-container">
          <img src={earthImg} className="App-logo" alt="Earth" />
          {selectedCountry && (
            <>
              <div className="Country-header">
                <img src={selectedCountry.flag.png} alt="logo" />
                <p>{selectedCountry.name}</p>
              </div>
            </>
          )}
          {selectedCountry && (
            <ul>
              <li>Continent: <span>{selectedCountry.continent}</span></li>
              <li>Population: <span>{selectedCountry.population}</span></li>
              <li>Capital: <span>{selectedCountry.capital}</span></li>
              <li>Main Language: <span>{selectedCountry.language}</span></li>
              <li>Currency: <span>{selectedCountry.currency}</span></li>
            </ul>
          )}
        </div>
        <h1>
          Country Information Lookup
        </h1>
        <p>Search any country name to get more information about it</p>
        <Autocomplete onSelect={handleSelect} />
      </header>
    </div>
  );
}

export default App;
