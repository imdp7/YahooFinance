import React from "react";
import axios from "axios";
import { key, host } from "../../api";
import {
  SpaceBetween,
  Table,
  Box,
  Button,
  DateRangePicker,
  ButtonDropdown,
  FormField,
} from "@cloudscape-design/components";
import { historicalDefinition } from "./common/Table";
import Dividends from "./Dividends";
import Split from "./Split";
import * as XLSX from "xlsx";
import Events from './Events';

const KEY_URL = `&region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;

function Historical(props) {
  const [historical, setHistorical] = React.useState([]);
  const [value, setValue] = React.useState(undefined);
  const [selectedOption, setSelectedOption] = React.useState("historical");
  const [active, setActive] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const fetchHistorical = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://yh-finance.p.rapidapi.com/stock/v3/get-historical-data?symbol=${props.symbol}${KEY_URL}`
      );
      const datas = response?.data;
      setHistorical(datas);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    fetchHistorical();
  }, [props.symbol]);

  const downloadExcel = () => {
    const sheetName =
    selectedOption === "historical"
      ? "Historical Data"
      : selectedOption === "dividend"
      ? "Dividends"
      : selectedOption === "split"
      ? "Stock Splits"
      : selectedOption === "capitalGain"
      ? "Capital Gain"
      : selectedOption === "events"
      ? "Stock Events"
      : "Data";
      let headers = [];
      let data = [];
    
      if (selectedOption === "historical") {
        headers = [
          "Date",
          "Open",
          "High",
          "Low",
          "Close",
          "Adj Close",
          "Volume",
        ];
        data = historical?.prices?.map((item) => [
          convertUnixTimestamp(item.date),
          decimal(item.open),
          decimal(item.high),
          decimal(item.low),
          decimal(item.close),
          decimal(item.adjclose),
          item.volume,
        ]);
      } else if (selectedOption === "dividend") {
        headers = ["Declaration Date", "ex-Dividend Date", "Frequency", "Pay Date", "Record Date", "Cash Amount", "Dividend Type"];
        data = [] // Logic to extract dividend data based on your implementation
      } else if (selectedOption === "split") {
        headers = ["Execution Date", "Split From", "Split To"];
        data = [] // Logic to extract stock splits data based on your implementation
      } else if (selectedOption === "capitalGain") {
        headers = ["Date", "Capital Gain"];
        data = [] // Logic to extract capital gain data based on your implementation
      } else if (selectedOption === "events") {
        headers = ["Ticker Change", "Type", "Date"];
        data = [] // Logic to extract stock events data based on your implementation
      }
    
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
            key: "previous-1-day",
            amount: 1,
            unit: "day",
            type: "relative",
          },
          {
            key: "previous-5-days",
            amount: 5,
            unit: "days",
            type: "relative",
          },
          {
            key: "previous-3-months",
            amount: 3,
            unit: "month",
            type: "relative",
          },
          {
            key: "previous-6-months",
            amount: 6,
            unit: "month",
            type: "relative",
          },
          {
            key: "previous-YTD",
            amount: "YTD",
            type: "relative",
          },
          {
            key: "previous-1-year",
            amount: 1,
            unit: "year",
            type: "relative",
          },
          {
            key: "previous-5-year",
            amount: 5,
            unit: "year",
            type: "relative",
          },
          {
            key: "max",
            amount: "Max",
            unit: "year",
            type: "relative",
          },
        ]}
        isValidRange={(range) => {
          if (range.type === "absolute") {
            const [startDateWithoutTime] = range.startDate.split("T");
            const [endDateWithoutTime] = range.endDate.split("T");
            if (!startDateWithoutTime || !endDateWithoutTime) {
              return {
                valid: false,
                errorMessage:
                  "The selected date range is incomplete. Select a start and end date for the date range.",
              };
            }
            if (new Date(range.startDate) - new Date(range.endDate) > 0) {
              return {
                valid: false,
                errorMessage:
                  "The selected date range is invalid. The start date must be before the end date.",
              };
            }
          }
          return { valid: true };
        }}
        i18nStrings={{
          todayAriaLabel: "Today",
          nextMonthAriaLabel: "Next month",
          previousMonthAriaLabel: "Previous month",
          customRelativeRangeDurationLabel: "Duration",
          customRelativeRangeDurationPlaceholder: "Enter duration",
          customRelativeRangeOptionLabel: "Custom range",
          customRelativeRangeOptionDescription:
            "Set a custom range in the past",
          customRelativeRangeUnitLabel: "Unit of time",
          formatRelativeRange: (e) => {
            const n = 1 === e.amount ? e.unit : `${e.unit}s`;
            return `Last ${e.amount} ${n}`;
          },
          formatUnit: (e, n) => (1 === n ? e : `${e}s`),
          dateTimeConstraintText:
            "Range is 6 to 30 days. For date, use YYYY/MM/DD. For time, use 24 hr format.",
          relativeModeTitle: "Relative range",
          absoluteModeTitle: "Absolute range",
          relativeRangeSelectionHeading: "Choose a range",
          startDateLabel: "Start date",
          endDateLabel: "End date",
          startTimeLabel: "Start time",
          endTimeLabel: "End time",
          clearButtonLabel: "Clear and dismiss",
          cancelButtonLabel: "Cancel",
          applyButtonLabel: "Apply",
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
        variant="primary"
          onItemClick={(evt) => {
            evt.preventDefault();
            setSelectedOption(evt.detail.id);
            setActive(true);
          }}
          items={[
            { text: "Historical Prices", id: "historical", disabled: false },
            { text: "Dividends only", id: "dividend", disabled: false },
            { text: "Stock splits", id: "split", disabled: false },
            { text: "Stock Events", id: "events", disabled: false },
            { text: "Capital gain", id: "capitalGain", disabled: false },
          ]}>
          {selectedOption === "historical"
            ? "Historical Prices"
            : selectedOption === "dividend"
            ? "Dividends only"
            : selectedOption === "split"
            ? "Stock splits"
            : selectedOption === "capitalGain"
            ? "Capital gain"
            : selectedOption === "events"
            ? "Stock Events" : ""}
            
        </ButtonDropdown>
      </SpaceBetween>
      <Box>
        {props?.profile && (
          <Box float="left" color="text-body-secondary">
            {"Currency in"} {props?.profile?.price?.currency}
          </Box>
        )}
        <Box float="right">
          <Button iconName="download" variant="normal" onClick={downloadExcel}>
            Download
          </Button>
        </Box>
      </Box>
      {selectedOption === "historical" && (
        <Table
          columnDefinitions={historicalDefinition}
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
              <Box padding={{ bottom: "s" }} variant="p" color="inherit">
                No resources to display.
              </Box>
            </Box>
          }
        />
      )}
      {selectedOption === "dividend" && <Dividends symbol={props.symbol} />}
      {selectedOption === "split" && <Split symbol={props.symbol} />}
      {selectedOption === "events" && <Events symbol={props.symbol} />}
    </SpaceBetween>
  );
}

export default Historical;
