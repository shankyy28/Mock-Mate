// src/components/BarChartComponent.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Coding Assessment', score: 85 },
  { name: 'Technical Interview', score: 90 },
  { name: 'Aptitude Test', score: 78 },
];

const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid stroke="#333" />
        <XAxis dataKey="name" stroke="#ffffff" />
        <YAxis stroke="#ffffff" />
        <Tooltip contentStyle={{ backgroundColor: '#333', color: '#ffffff' }} />
        <Legend wrapperStyle={{ color: '#ffffff' }} />
        <Bar dataKey="score" fill="#90caf9" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
