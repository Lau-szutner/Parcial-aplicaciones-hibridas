'use client';

import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los componentes que necesitas
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ spendsData }) => {
  if (
    !spendsData ||
    typeof spendsData !== 'object' ||
    Object.keys(spendsData).length === 0
  ) {
    return (
      <div className="text-center text-gray-500">
        No hay datos para mostrar.
      </div>
    );
  }

  const data = {
    labels: Object.keys(spendsData),
    datasets: [
      {
        label: 'Cantidad',
        data: Object.values(spendsData),
        backgroundColor: [
          '#FF638499', // rojo
          '#36A2EB99', // azul
          '#FFCE5699', // amarillo
          '#4BC0C099', // turquesa
          '#9966FF99', // violeta
        ],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ffffff',
        },
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly gap-4">
      <ul className="mb-4 md:mb-0">
        {Object.entries(spendsData).map(([categoria, valor]) => (
          <li
            key={categoria}
            className="bg-gray-200 p-2 m-1 rounded-md w-40 text-black shadow"
          >
            <span className="font-semibold">{categoria}</span>: {valor}
          </li>
        ))}
      </ul>
      <div className="w-full flex items-center justify-center">
        <Pie data={data} options={options} width={500} height={500} />
      </div>
    </div>
  );
};

PieChart.propTypes = {
  spendsData: PropTypes.object.isRequired,
};

export default PieChart;
