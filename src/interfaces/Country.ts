interface Country {
  name: string;
  flag: {
    png: string;
    svg: string;
    alt: string;
  };
  language: string;
  capital: string;
  continent: string;
  population: number;
  currency: string;
}

export default Country;