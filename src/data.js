import axios from 'axios';

export const fetchData = async (country) => {
  try {
    const response = await axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`);
    const data = response.data.timeline.cases;
    const formattedData = Object.keys(data).map((date) => ({
      date,
      cases: data[date],
      deaths: response.data.timeline.deaths[date],
    }));
    return formattedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
