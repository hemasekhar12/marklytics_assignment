import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Chart from './components/Chart';
import DataTable from './components/DataTable';
import Filter from './components/Filter';
import { AppContainer } from './styles';

const fetchData = async (country, filterType) => {
  try {
    const response = await axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`);
    const data = response.data.timeline;
    
    if (filterType === 'daily') {
      return Object.keys(data.cases).map((date) => ({
        date,
        cases: data.cases[date],
        deaths: data.deaths[date],
      }));
    } else if (filterType === 'monthly') {
      const monthlyData = {};
      Object.keys(data.cases).forEach((date) => {
        const [month, year] = date.split('/').slice(0, 2).join('/');
        if (!monthlyData[year]) monthlyData[year] = {};
        if (!monthlyData[year][month]) monthlyData[year][month] = { cases: 0, deaths: 0 };
        monthlyData[year][month].cases += data.cases[date];
        monthlyData[year][month].deaths += data.deaths[date];
      });
      return Object.keys(monthlyData).flatMap((year) =>
        Object.keys(monthlyData[year]).map((month) => ({
          date: `${month}/${year}`,
          cases: monthlyData[year][month].cases,
          deaths: monthlyData[year][month].deaths,
        }))
      );
    } else if (filterType === 'yearly') {
      const yearlyData = {};
      Object.keys(data.cases).forEach((date) => {
        const year = date.split('/').pop();
        if (!yearlyData[year]) yearlyData[year] = { cases: 0, deaths: 0 };
        yearlyData[year].cases += data.cases[date];
        yearlyData[year].deaths += data.deaths[date];
      });
      return Object.keys(yearlyData).map((year) => ({
        date: year,
        cases: yearlyData[year].cases,
        deaths: yearlyData[year].deaths,
      }));
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const App = () => {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState('usa');
  const [filterType, setFilterType] = useState('daily');

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData(country, filterType);
      console.log(result);  
      setData(result);
    };
    getData();
  }, [country, filterType]);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
    <AppContainer>
      <Header />
      <Filter onCountryChange={handleCountryChange} onFilterTypeChange={handleFilterTypeChange} />
      <Chart data={data} />
      <DataTable data={data} />
    </AppContainer>
  );
};

export default App;
