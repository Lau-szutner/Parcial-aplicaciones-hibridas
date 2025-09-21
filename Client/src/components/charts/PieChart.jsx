'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los componentes que necesitas
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ spendsData }) => {
  const data = {
    labels: Object.keys(spendsData),
    datasets: [
      {
        label: 'Cantidad',
        data: Object.values(spendsData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // rojo
          'rgba(54, 162, 235, 0.6)', // azul
          'rgba(255, 206, 86, 0.6)', // amarillo
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '500px', margin: '0 auto' }}>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
