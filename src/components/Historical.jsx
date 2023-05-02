import React from 'react';
import axios from 'axios';
import { key, host } from '../../api';
import {
  SpaceBetween,
  Table,
  Box,
  Button,
  DateRangePicker,
  ButtonDropdown,
  FormField,
} from '@cloudscape-design/components';
import * as XLSX from 'xlsx';

const KEY_URL = `&region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;
export function convertUnixTimestamp(unixTimestamp) {
  const dateObj = new Date(unixTimestamp * 1000);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const year = dateObj.getFullYear();
  const month = months[dateObj.getMonth()];
  const date = dateObj.getDate().toString().padStart(2, '0');
  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  return `${dayOfWeek}, ${month} ${date}, ${year} at ${hours}:${minutes} EST`;
}
function Historical(props) {
  const [historical, setHistorical] = React.useState([]);
  const [value, setValue] = React.useState(undefined);
  const [selectedOption, setSelectedOption] = React.useState({
    text: 'Historical Prices',
    id: 'hp',
    disabled: false,
  });
  const [loading, setLoading] = React.useState(false);

  const fetchHistorical = async () => {
    try {
      const response = await axios.get(
        `https://yh-finance.p.rapidapi.com/stock/v3/get-historical-data?symbol=${props.symbol}${KEY_URL}`
      );
      const datas = response?.data;
      setHistorical(datas);
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    setLoading(true);
    fetchHistorical();
    setLoading(false);
  }, [props.symbol]);

  function decimal(number) {
    return number?.toFixed(2);
  }

  const downloadExcel = () => {
    const sheetName = 'Historical Data';
    const headers = [
      'Date',
      'Open',
      'High',
      'Low',
      'Close',
      'Adj Close',
      'Volume',
    ];
    const data = historical?.prices?.map((item) => [
      convertUnixTimestamp(item.date),
      decimal(item.open),
      decimal(item.high),
      decimal(item.low),
      decimal(item.close),
      decimal(item.adjclose),
      item.volume,
    ]);
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${sheetName}.xlsx`);
  };

  const TimeRange = () => {
    return (
      <DateRangePicker
        onChange={({ detail }) => setValue(detail.value)}
        value={value}
        relativeOptions={[
          {
            key: 'previous-1-day',
            amount: 1,
            unit: 'day',
            type: 'relative',
          },
          {
            key: 'previous-5-days',
            amount: 5,
            unit: 'days',
            type: 'relative',
          },
          {
            key: 'previous-3-months',
            amount: 3,
            unit: 'month',
            type: 'relative',
          },
          {
            key: 'previous-6-months',
            amount: 6,
            unit: 'month',
            type: 'relative',
          },
          {
            key: 'previous-YTD',
            amount: 'YTD',
            type: 'relative',
          },
          {
            key: 'previous-1-year',
            amount: 1,
            unit: 'year',
            type: 'relative',
          },
          {
            key: 'previous-5-year',
            amount: 5,
            unit: 'year',
            type: 'relative',
          },
          {
            key: 'max',
            amount: 'Max',
            unit: 'year',
            type: 'relative',
          },
        ]}
        isValidRange={(range) => {
          if (range.type === 'absolute') {
            const [startDateWithoutTime] = range.startDate.split('T');
            const [endDateWithoutTime] = range.endDate.split('T');
            if (!startDateWithoutTime || !endDateWithoutTime) {
              return {
                valid: false,
                errorMessage:
                  'The selected date range is incomplete. Select a start and end date for the date range.',
              };
            }
            if (new Date(range.startDate) - new Date(range.endDate) > 0) {
              return {
                valid: false,
                errorMessage:
                  'The selected date range is invalid. The start date must be before the end date.',
              };
            }
          }
          return { valid: true };
        }}
        i18nStrings={{
          todayAriaLabel: 'Today',
          nextMonthAriaLabel: 'Next month',
          previousMonthAriaLabel: 'Previous month',
          customRelativeRangeDurationLabel: 'Duration',
          customRelativeRangeDurationPlaceholder: 'Enter duration',
          customRelativeRangeOptionLabel: 'Custom range',
          customRelativeRangeOptionDescription:
            'Set a custom range in the past',
          customRelativeRangeUnitLabel: 'Unit of time',
          formatRelativeRange: (e) => {
            const n = 1 === e.amount ? e.unit : `${e.unit}s`;
            return `Last ${e.amount} ${n}`;
          },
          formatUnit: (e, n) => (1 === n ? e : `${e}s`),
          dateTimeConstraintText:
            'Range is 6 to 30 days. For date, use YYYY/MM/DD. For time, use 24 hr format.',
          relativeModeTitle: 'Relative range',
          absoluteModeTitle: 'Absolute range',
          relativeRangeSelectionHeading: 'Choose a range',
          startDateLabel: 'Start date',
          endDateLabel: 'End date',
          startTimeLabel: 'Start time',
          endTimeLabel: 'End time',
          clearButtonLabel: 'Clear and dismiss',
          cancelButtonLabel: 'Cancel',
          applyButtonLabel: 'Apply',
        }}
        dateOnly
        placeholder="Filter by a date and time range"
      />
    );
  };
  return (
    <SpaceBetween size="m">
      <SpaceBetween size="m" direction="horizontal">
        <TimeRange />
        <ButtonDropdown
          items={[
            { text: 'Historical Prices', id: 'hp', disabled: false },
            { text: 'Dividents only', id: 'do', disabled: false },
            { text: 'Stock splits', id: 'ss', disabled: false },
            { text: 'Capital gain', id: 'cg', disabled: false },
          ]}
        >
          {selectedOption.text}
        </ButtonDropdown>
      </SpaceBetween>
      <Box>
        {props?.profile && (
          <Box float="left" color="text-body-secondary">
            {'Currency in'} {props?.profile?.price?.currency}
          </Box>
        )}
        <Box float="right">
          <Button iconName="download" variant="normal" onClick={downloadExcel}>
            Download
          </Button>
        </Box>
      </Box>

      <Table
        columnDefinitions={[
          {
            id: 'date',
            header: 'Date',
            cell: (item) => (
              <Box fontWeight="bold">
                {' '}
                {convertUnixTimestamp(item?.date) || '-'}
              </Box>
            ),
            sortingField: 'name',
          },
          {
            id: 'open',
            header: 'Open',
            cell: (item) => decimal(item?.open) || '-',
          },
          {
            id: 'high',
            header: 'High',
            cell: (item) => decimal(item?.high) || '-',
          },
          {
            id: 'low',
            header: 'Low',
            cell: (item) => decimal(item?.low) || '-',
          },
          {
            id: 'close',
            header: 'Close*',
            cell: (item) => decimal(item?.close) || '-',
          },
          {
            id: 'adjClose',
            header: 'AdjClose**',
            cell: (item) => decimal(item?.adjclose) || '-',
          },
          {
            id: 'volume',
            header: 'Volume',
            cell: (item) => item?.volume || '-',
          },
        ]}
        items={historical?.prices}
        wrapLines
        stripedRows
        loading={loading}
        loadingText="Loading resources"
        sortingDisabled
        variant="embedded"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No resources</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              No resources to display.
            </Box>
          </Box>
        }
      />
    </SpaceBetween>
  );
}

export default Historical;
