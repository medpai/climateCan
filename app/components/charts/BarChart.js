'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ 
  title, 
  data, 
  labels, 
  yAxisLabel, 
  datasets,
  height = 400,
  horizontal = false
}) => {
  const chartData = {
    labels,
    datasets: datasets || [
      {
        label: title,
        data: data,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' : 'x',
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed[horizontal ? 'x' : 'y'] !== null) {
              label += context.parsed[horizontal ? 'x' : 'y'];
              if (yAxisLabel) {
                label += ` ${yAxisLabel}`;
              }
            }
            return label;
          }
        }
      }
    },
    scales: {
      [horizontal ? 'x' : 'y']: {
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel
        }
      }
    }
  };

  return (
    <div style={{ height: `${height}px` }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
