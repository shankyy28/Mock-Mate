// src/components/LineChartComponent.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'January', accuracy: 80 },
  { month: 'February', accuracy: 85 },
  { month: 'March', accuracy: 90 },
  { month: 'April', accuracy: 87 },
  { month: 'May', accuracy: 92 },
];

const LineChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid stroke="#333" />
        <XAxis dataKey="month" stroke="#ffffff" />
        <YAxis stroke="#ffffff" />
        <Tooltip contentStyle={{ backgroundColor: '#333', color: '#ffffff' }} />
        <Legend wrapperStyle={{ color: '#ffffff' }} />
        <Line type="monotone" dataKey="accuracy" stroke="#f48fb1" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
