import React, { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  Dropdown,
  DatePicker,
  Toggle,
  PrimaryButton,
  mergeStyles,
  Separator
} from '@fluentui/react';
import PropTypes from 'prop-types';
import reportService, { reportTypes, chartTypes, groupByOptions } from '../../services/reportService';

const sectionStyles = mergeStyles({
  backgroundColor: 'white',
  boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
  borderRadius: '2px',
  padding: '20px',
  marginBottom: '20px'
});

/**
 * ReportBuilder component handles the UI for configuring report parameters
 * 
 * @component
 */
const ReportBuilder = ({ 
  onGenerateReport, 
  isLoading, 
  initialConfig = {} 
}) => {
  // Report configuration state
  const [reportConfig, setReportConfig] = useState({
    reportType: 'sales',
    dateRange: { 
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)), 
      endDate: new Date() 
    },
    groupBy: 'month',
    showChart: true,
    chartType: 'line',
    ...initialConfig
  });

  // Handle change in report configuration
  const handleConfigChange = (field, value) => {
    setReportConfig({
      ...reportConfig,
      [field]: value
    });
  };

  // Handle date range changes
  const handleDateRangeChange = (field, date) => {
    setReportConfig({
      ...reportConfig,
      dateRange: {
        ...reportConfig.dateRange,
        [field]: date
      }
    });
  };

  // Generate the report with current configuration
  const handleGenerateReport = () => {
    onGenerateReport(reportConfig);
  };

  // Predefined date range options
  const applyDateRange = (range) => {
    const today = new Date();
    let startDate;
    
    switch(range) {
      case 'thisMonth':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'lastMonth':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        break;
      case 'thisQuarter':
        const quarter = Math.floor(today.getMonth() / 3);
        startDate = new Date(today.getFullYear(), quarter * 3, 1);
        break;
      case 'lastQuarter':
        const prevQuarter = Math.floor(today.getMonth() / 3) - 1;
        const year = prevQuarter < 0 ? today.getFullYear() - 1 : today.getFullYear();
        const month = prevQuarter < 0 ? 9 : prevQuarter * 3;
        startDate = new Date(year, month, 1);
        break;
      case 'ytd':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      case 'lastYear':
        startDate = new Date(today.getFullYear() - 1, 0, 1);
        const endDate = new Date(today.getFullYear() - 1, 11, 31);
        setReportConfig({
          ...reportConfig,
          dateRange: { startDate, endDate }
        });
        return;
      default:
        return;
    }
    
    setReportConfig({
      ...reportConfig,
      dateRange: { startDate, endDate: today }
    });
  };

  const dateRangeOptions = [
    { key: 'thisMonth', text: 'This Month' },
    { key: 'lastMonth', text: 'Last Month' },
    { key: 'thisQuarter', text: 'This Quarter' },
    { key: 'lastQuarter', text: 'Last Quarter' },
    { key: 'ytd', text: 'Year to Date' },
    { key: 'lastYear', text: 'Last Year' },
    { key: 'custom', text: 'Custom Range' }
  ];

  return (
    <div className={sectionStyles}>
      <Text variant="large" styles={{ root: { marginBottom: 16 } }}>Report Configuration</Text>
      
      <Stack tokens={{ childrenGap: 16 }}>
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow={1}>
            <Dropdown
              label="Report Type"
              selectedKey={reportConfig.reportType}
              options={reportTypes}
              onChange={(_, option) => handleConfigChange('reportType', option.key)}
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Dropdown
              label="Group By"
              selectedKey={reportConfig.groupBy}
              options={groupByOptions}
              onChange={(_, option) => handleConfigChange('groupBy', option.key)}
            />
          </Stack.Item>
        </Stack>
        
        <Dropdown
          label="Date Range"
          options={dateRangeOptions}
          onChange={(_, option) => applyDateRange(option.key)}
          defaultSelectedKey="lastMonth"
        />
        
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow={1}>
            <DatePicker
              label="Start Date"
              value={reportConfig.dateRange.startDate}
              onSelectDate={(date) => handleDateRangeChange('startDate', date)}
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <DatePicker
              label="End Date"
              value={reportConfig.dateRange.endDate}
              onSelectDate={(date) => handleDateRangeChange('endDate', date)}
            />
          </Stack.Item>
        </Stack>
        
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow={1}>
            <Toggle
              label="Show Chart"
              checked={reportConfig.showChart}
              onChange={(_, checked) => handleConfigChange('showChart', checked)}
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Dropdown
              label="Chart Type"
              selectedKey={reportConfig.chartType}
              options={chartTypes}
              onChange={(_, option) => handleConfigChange('chartType', option.key)}
              disabled={!reportConfig.showChart}
            />
          </Stack.Item>
        </Stack>
        
        <Separator />
        
        <Stack horizontal horizontalAlign="end">
          <PrimaryButton
            text="Generate Report"
            onClick={handleGenerateReport}
            disabled={isLoading}
          />
        </Stack>
      </Stack>
    </div>
  );
};

ReportBuilder.propTypes = {
  /** Callback function when generate report button is clicked */
  onGenerateReport: PropTypes.func.isRequired,
  /** Loading state to disable the generate button */
  isLoading: PropTypes.bool,
  /** Initial configuration for the report builder */
  initialConfig: PropTypes.shape({
    reportType: PropTypes.string,
    dateRange: PropTypes.shape({
      startDate: PropTypes.instanceOf(Date),
      endDate: PropTypes.instanceOf(Date)
    }),
    groupBy: PropTypes.string,
    showChart: PropTypes.bool,
    chartType: PropTypes.string
  })
};

export default ReportBuilder;