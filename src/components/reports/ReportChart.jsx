import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { mergeStyles, Text } from '@fluentui/react';
import reportService from '../../services/reportService';

// Include chart.js dependencies
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const chartContainerStyles = mergeStyles({
  height: '350px',
  position: 'relative'
});

const sectionStyles = mergeStyles({
  backgroundColor: 'white',
  boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
  borderRadius: '2px',
  padding: '20px',
  marginBottom: '20px'
});

/**
 * ReportChart component to visualize report data
 * 
 * @component
 */
const ReportChart = ({ reportType, chartType, reportData }) => {
  // Get chart data based on report type
  const data = useMemo(() => {
    if (chartType === 'pie') {
      return reportService.getPieChartData(reportType, reportData);
    } else {
      return reportService.getChartData(reportType, reportData);
    }
  }, [reportType, chartType, reportData]);

  // Configure chart options
  const options = useMemo(() => {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== undefined) {
                // Add currency symbol for financial values
                if (reportType === 'sales' || reportType === 'opportunities') {
                  if (context.dataset.label.includes('Revenue') || 
                      context.dataset.label.includes('Value') || 
                      context.dataset.label.includes('Deal')) {
                    label += '$' + context.parsed.y.toLocaleString();
                  } else {
                    label += context.parsed.y;
                  }
                } else {
                  label += context.parsed.y;
                }
              } else if (context.parsed !== undefined) {
                // For pie charts
                if (reportType === 'sales' || reportType === 'opportunities') {
                  label += '$' + context.parsed.toLocaleString();
                } else {
                  label += context.parsed;
                }
              }
              return label;
            }
          }
        }
      }
    };

    // Additional options for line and bar charts
    if (chartType !== 'pie') {
      return {
        ...baseOptions,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: getYAxisTitle(reportType)
            }
          },
          x: {
            title: {
              display: true,
              text: 'Period'
            }
          }
        }
      };
    }
    
    return baseOptions;
  }, [reportType, chartType]);

  // Get Y-axis title based on report type
  const getYAxisTitle = (type) => {
    switch(type) {
      case 'sales':
        return 'Revenue ($)';
      case 'opportunities':
        return 'Value ($)';
      case 'leads':
      case 'contacts':
        return 'Count';
      case 'activities':
        return 'Activity Count';
      default:
        return 'Value';
    }
  };

  // Title for the chart section
  const getChartTitle = () => {
    const reportTypeName = reportType.charAt(0).toUpperCase() + reportType.slice(1);
    return `${reportTypeName} ${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`;
  };

  // Render the appropriate chart type
  const renderChart = () => {
    if (!data || !data.labels || data.labels.length === 0) {
      return <Text>No data available for chart</Text>;
    }

    switch(chartType) {
      case 'line':
        return <Line data={data} options={options} />;
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'pie':
        return <Pie data={data} options={options} />;
      default:
        return <Text>Unsupported chart type</Text>;
    }
  };

  if (!reportData || reportData.length === 0) {
    return null;
  }

  return (
    <div className={sectionStyles}>
      <Text variant="large" styles={{ root: { marginBottom: 16 } }}>
        {getChartTitle()}
      </Text>
      <div className={chartContainerStyles}>
        {renderChart()}
      </div>
    </div>
  );
};

ReportChart.propTypes = {
  /** Type of report being visualized */
  reportType: PropTypes.oneOf(['sales', 'leads', 'opportunities', 'activities', 'contacts']).isRequired,
  /** Type of chart to display */
  chartType: PropTypes.oneOf(['line', 'bar', 'pie']).isRequired,
  /** Data to be visualized */
  reportData: PropTypes.array.isRequired
};

export default ReportChart;