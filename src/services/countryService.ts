import Country from '../interfaces/Country';

class CountryServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CountryServiceError';
  }
}

class CountryService {
  private apiUrl: string = 'https://restcountries.com/v3.1/name/';
  private apiFields: string[] = [
    'name',
    'flags',
    'capital',
    'continents',
    'population',
    'currencies',
    'languages'
  ]

  async fetchCountryData(countryName: string): Promise<Country[] | null> {
    try {
      const fullAPIUrl = `${this.apiUrl}${countryName}?${this.apiFields.join(',')}`;
      const response = await fetch(fullAPIUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();
  
      if (!data) {
        throw new Error('No countries found');
      }

      const countryData: Country[] = data.filter((country: any) => country.name.common.toLowerCase().indexOf(countryName.toLowerCase().trim()) !== -1).map((country: any) => ({
        name: country.name.common,
        flag: country.flags,
        language: country.languages ? Object.values(country.languages)[0] as string : 'N/A',
        capital: country.capital?.[0] || 'N/A',
        continent: country.continents?.[0],
        population: country.population,
        currency: country.currencies ? Object.keys(country.currencies)[0] as string : 'N/A',
      }));

      return countryData;

    } catch (error: unknown) {
      if (error instanceof CountryServiceError) {
        console.error('Country Service Error:', error.message);
      } else {
        console.error('Unknown Error:', error);
      }

      return null;
    }
  }
}

const countryServiceExp = new CountryService();

export default countryServiceExp;