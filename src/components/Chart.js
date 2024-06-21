import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Chart = ({ data }) => {
  // Formatter function for y-axis values
  const formatYAxis = (tickItem) => {
    if (tickItem >= 1000000) {
      return `${(tickItem / 1000000).toFixed(1)}M`;
    } else if (tickItem >= 1000) {
      return `${(tickItem / 1000).toFixed(1)}K`;
    } else {
      return tickItem;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;

