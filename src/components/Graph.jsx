import * as React from "react";
import {
  AreaChart,
  BarChart,
  Box,
  Container,
  Header,
  Button,
  SpaceBetween,
  Link,
  SegmentedControl,
} from "@cloudscape-design/components";
import axios from "axios";
import { key, host } from "../../api";
import { InfoLink, HelpPanels } from "../components/common/InfoLink";
const BASE_URL = "https://yh-finance.p.rapidapi.com/stock/v3/get-chart?";
const KEY_URL = `&region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;

export function Graph(props) {
  const {
    summary = props?.profile?.summaryDetail,
    earnings = props?.profile?.earnings,
    profile = props.profile,
    symbol = props.symbol,
  } = props;
  const [loading, setLoading] = React.useState("finished");
  const [graphData, setGraphData] = React.useState([]);
  const [range, setRange] = React.useState("1d"); // Track the selected range
  const [interval, setInterval] = React.useState("15m");

  const fetchData = async () => {
    try {
      setLoading("loading");
      const response = await axios.get(
        `${BASE_URL}interval=${interval}&symbol=${symbol}&range=${range}&useYfid=true&includeAdjustedClose=true${KEY_URL}`
      );
      const data = response?.data?.chart?.result[0];
      setGraphData(data);
      setLoading("finished");
    } catch (e) {
      console.log(e);
      setLoading("error");
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [range, interval]);

  const handleRangeClick = (selectedRange, selectedInterval) => {
    setRange(selectedRange);
    setInterval(selectedInterval);
  };

  const timestamps = graphData?.timestamp || [];
  const prices = graphData?.indicators?.quote[0]?.close || [];
  const meta = graphData?.meta?.chartPreviousClose;

  const seriesData = React.useMemo(() => {
    // Combine the close and timestamp arrays into a single array of objects
    return prices.map((close, index) => {
      return { x: new Date(timestamps[index] * 1000), y: close };
    });
  }, [prices, timestamps]);

  return (
    <SpaceBetween size="s">
      <SpaceBetween size="xxs" direction="horizontal">
        <Button
          variant={range === "1d" ? "primary" : "link"}
          onClick={() => handleRangeClick("1d", "5m")}>
          1D
        </Button>
        <Button
          variant={range === "5d" ? "primary" : "link"}
          onClick={() => handleRangeClick("5d", "15m")}>
          5D
        </Button>
        <Button
          variant={range === "1mo" ? "primary" : "link"}
          onClick={() => handleRangeClick("1mo", "30m")}>
          1M
        </Button>
        <Button
          variant={range === "6mo" ? "primary" : "link"}
          onClick={() => handleRangeClick("6mo", "60m")}>
          6M
        </Button>
        <Button
          variant={range === "ytd" ? "primary" : "link"}
          onClick={() => handleRangeClick("ytd", "60m")}
          isActive={range === "ytd"}>
          YTD
        </Button>
        <Button
          variant={range === "1y" ? "primary" : "link"}
          onClick={() => handleRangeClick("1y", "1d")}>
          1Y
        </Button>
        <Button
          variant={range === "5y" ? "primary" : "link"}
          onClick={() => handleRangeClick("5y", "1mo")}>
          5Y
        </Button>
        <Button
          variant={range === "max" ? "primary" : "link"}
          onClick={() => handleRangeClick("max", "1mo")}>
          Max
        </Button>
        <Button iconName="expand" variant="icon" />
      </SpaceBetween>
      <AreaChart
        statusType={loading}
        errorText="Error loading data."
        loadingText="Loading chart"
        recoveryText="Retry"
        series={[
          {
            title: "Price",
            type: "area",
            data: seriesData,
            valueFormatter: function l(e) {
              return Math.abs(e) >= 1e9
                ? (e / 1e9).toFixed(1).replace(/\.0$/, "") + "B"
                : Math.abs(e) >= 1e6
                ? (e / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
                : Math.abs(e) >= 1e3
                ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
                : e.toFixed(2);
            },
          },
          {
            title: "Previous Close",
            type: "threshold",
            y: meta,
            valueFormatter: function l(e) {
              return Math.abs(e) >= 1e9
                ? (e / 1e9).toFixed(1).replace(/\.0$/, "") + "B"
                : Math.abs(e) >= 1e6
                ? (e / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
                : Math.abs(e) >= 1e3
                ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
                : e.toFixed(2);
            },
          },
        ]}
        xDomain={[
          new Date(timestamps[0] * 1000),
          new Date(timestamps[timestamps.length - 1] * 1000),
        ]}
        yDomain={[Math.min(...prices), Math.max(...prices)]}
        i18nStrings={{
          detailPopoverDismissAriaLabel: "Dismiss",
          chartAriaRoleDescription: "line chart",
          xTickFormatter: (e) =>
            e
              .toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: !1,
              })
              .split(",")
              .join("\n"),
          yTickFormatter: function l(e) {
            return Math.abs(e) >= 1e9
              ? (e / 1e9).toFixed(1).replace(/\.0$/, "") + "G"
              : Math.abs(e) >= 1e6
              ? (e / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
              : Math.abs(e) >= 1e3
              ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
              : e.toFixed(2);
          },
        }}
        ariaLabel="Single data series line chart"
        detailPopoverSize="small"
        height={250}
        hideFilter
        hideLegend
        xScaleType="time"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no data available
            </Box>
          </Box>
        }
      />
    </SpaceBetween>
  );
}

export function BarGraph({ loadHelpPanelContent, symbol }) {

  const options = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/stock/get-earnings',
    params: {
      symbol: symbol,
      region: 'US',
      lang: 'en-US'
    },
    headers: {
      'X-RapidAPI-Key': '53858f6f17msh56f101adaa014e6p175338jsn02a3e984b0ee',
      'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
    }
  };

  const [selectedId, setSelectedId] = React.useState(
    "seg-1"
  );
  const [loading, setLoading] = React.useState("finished");
  const [result, setResult] = React.useState([]);

  const fetchData = async () => {
    try {
      setLoading("loading");
      const response = await axios.request(options);
      const data = response?.data?.quoteSummary?.result[0]?.earnings;
      setResult(data);
      console.log(result)
      setLoading("finished");
    } catch (e) {
      console.log(e);
      setLoading("error");
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [symbol]);

  const earnings = result?.financialsChart?.quarterly || [];
  const quaterlyRevenue = earnings.map((item) => {
    const dateStr = item.date;
    const quarter = dateStr.match(/\d+/)[0];
    const year = dateStr.match(/\d{4}/)[0];
    const month = (Number(quarter) - 1) * 3;
    return {
      x: new Date(year, month),
      y: item.revenue.raw,
    };
  });
  const quaterlyEarnings = earnings.map((item) => {
    const dateStr = item.date;
    const quarter = dateStr.match(/\d+/)[0];
    const year = dateStr.match(/\d{4}/)[0];
    const month = (Number(quarter) - 1) * 3;
    return {
      x: new Date(year, month),
      y: item.earnings.raw,
    };
  });

     // Find the highest and lowest revenue and earnings values
  const revenueValues = earnings.map((item) => item.revenue.raw);
  const earningsValues = earnings.map((item) => item.earnings.raw);
  const highestValue = Math.max(...revenueValues, ...earningsValues);
  const lowestValue = Math.min(...revenueValues, ...earningsValues);

  const xDomain = quaterlyRevenue.map((item) => item.x);
  return (
    <Container
      header={
        <Header
          variant="h3"
          description={
            <>
<SegmentedControl
      selectedId={selectedId}
      onChange={({ detail }) =>
        setSelectedId(detail.selectedId)
      }
      label="Default segmented control"
      options={[
        { text: "Quaterly", id: "seg-1" },
        { text: "Annually", id: "seg-2" },
      ]}
    />
            </>
          }
          info={
            <InfoLink
              onFollow={() =>
                loadHelpPanelContent(
                  <HelpPanels
                    title="Trend"
                    des="View the latest announcement for the AWS services you're using. Learn about new capabilities that you can use to experiment and innovate. These announcements are personalized to your account."
                  />
                )
              }
            />
          }>
          Financials
        </Header>
      }>
      <BarChart
        series={[
          {
            title: "Revenue",
            type: "bar",
            data: quaterlyRevenue,
            valueFormatter: (e) => "$" + e.toLocaleString("en-US"),
          },
          {
            title: "Earnings",
            type: "bar",
            data: quaterlyEarnings,
            valueFormatter: (e) => "$" + e.toLocaleString("en-US"),
          },
          
        ]}
        xDomain={xDomain}
        yDomain={[lowestValue, highestValue]}
        i18nStrings={{
          filterLabel: "Filter displayed data",
          filterPlaceholder: "Filter data",
          filterSelectedAriaLabel: "selected",
          detailPopoverDismissAriaLabel: "Dismiss",
          legendAriaLabel: "Legend",
          chartAriaRoleDescription: "line chart",
          xTickFormatter: (e) =>
            e
              .toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour12: !1,
              })
              .split(",")
              .join("\n"),
          yTickFormatter: function o(e) {
            return Math.abs(e) >= 1e9
              ? (e / 1e9).toFixed(1).replace(/\.0$/, "") + "B"
              : Math.abs(e) >= 1e6
              ? (e / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
              : Math.abs(e) >= 1e3
              ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
              : e.toFixed(2);
          },
        }}
        ariaLabel="Single data series line chart"
        errorText="Error loading data."
        height={300}
        loadingText="Loading chart"
        recoveryText="Retry"
        statusType={loading}
        xScaleType="categorical"
        yTitle="Revenue (USD)"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no data available
            </Box>
          </Box>
        }
      />
    </Container>
  );
}
