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
import { InfoLink, HelpPanels } from "../components/common/InfoLink";


export function Graph({graphData, loadings, fetchChart, setInterval, setRange, range}) {

  const handleRangeClick = (selectedRange, selectedInterval) => {
    setRange(selectedRange);
    setInterval(selectedInterval);
    fetchChart(); // Call fetchChart to update the chart data

  };

  const timestamps = graphData?.timestamp || [];
  const prices = graphData?.indicators?.quote[0]?.close || [];
  const highs = graphData?.indicators?.quote[0]?.high || [];
  const lows = graphData?.indicators?.quote[0]?.low || [];
  const volumes = graphData?.indicators?.quote[0]?.volume || [];
  const opens = graphData?.indicators?.quote[0]?.open || [];
  const meta = graphData?.meta?.chartPreviousClose;

  const seriesData = React.useMemo(() => {
    // Combine the data arrays into a single array of objects
    return timestamps.map((timestamp, index) => {
      return {
        x: new Date(timestamp * 1000),
        y: prices[index],
        high: highs[index],
        low: lows[index],
        volume: volumes[index],
        close: prices[index],
        open: opens[index],
      };
    });
  }, [timestamps, prices, highs, lows, volumes, opens]);

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
        statusType={loadings}
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
        onRecoveryClick={() => fetchChart()}
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

export function BarGraph({ loadHelpPanelContent, earning, loadings, fetchEarnings }) {

  const [selectedId, setSelectedId] = React.useState(
    "annually"
  );

  const earnings = selectedId === 'annually' ? earning?.financialsChart?.yearly : earning?.financialsChart?.quarterly;

  const annualRevenue = earning?.financialsChart?.yearly?.map((item) => {
    const year = item.date.toString().match(/\d{4}/)?.[0]
    return {
      x: new Date(year),
      y: item.revenue.raw,
    };
  });
  const annualEarnings = earning?.financialsChart?.yearly?.map((item) => {
    const year = item.date.toString().match(/\d{4}/)?.[0]
    return {
      x: new Date(year),
      y: item.earnings.raw,
    };
  });

  const quarterlyRevenue = earning?.financialsChart?.quarterly?.map((item) => {
    const dateStr = item.date;
    const quarter = dateStr.match(/\d+/)[0];
    const year = dateStr.match(/\d{4}/)[0];
    const month = (Number(quarter) - 1) * 3;
    return {
      x: new Date(year, month),
      y: item.revenue.raw,
    };
  });
  const quarterlyEarnings = earning?.financialsChart?.quarterly?.map((item) => {
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
  const revenueValues = selectedId === 'annually' ? (annualRevenue ?? []).map(item => item.y) : (quarterlyRevenue ?? []).map(item => item.y);
  const earningsValues = selectedId === 'annually' ? (annualEarnings ?? []).map(item => item.y) : (quarterlyEarnings ?? []).map(item => item.y);
  const highestValue = Math.max(...revenueValues, ...earningsValues);
  const lowestValue = Math.min(...revenueValues, ...earningsValues);
  
  const xDomain = selectedId === 'annually'
  ? (annualRevenue ?? []).map((item) => item.x)
  : (quarterlyRevenue ?? []).map((item) => item.x);

const earningsData = selectedId === 'annually' ? (annualEarnings ?? []) : (quarterlyEarnings ?? []);
const revenueData = selectedId === 'annually' ? (annualRevenue ?? []) : (quarterlyRevenue ?? []);

const xTitle = selectedId === 'annually' ? "Annually" : 'Quarterly';
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
        { text: "Annually", id: "annually" },
        { text: "Quaterly", id: "quarterly" },
      ]}
    />
            </>
          }
          info={
            <InfoLink
              onFollow={() =>
                loadHelpPanelContent(
                  <HelpPanels
                    title="Financials"
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
            data: revenueData,
            valueFormatter: (e) => "$" + e.toLocaleString("en-US"),
          },
          {
            title: "Earnings",
            type: "bar",
            data: earningsData,
            valueFormatter: (e) => "$" + e.toLocaleString("en-US"),
          },
        ]}
        xDomain={xDomain || []}
        yDomain={[lowestValue, highestValue] || []}
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
        onRecoveryClick={() => fetchData()}
        height={300}
        loadingText="Loading chart"
        recoveryText="Retry"
        statusType={loadings}
        xScaleType="categorical"
        onRecoveryClick={fetchEarnings}
        yTitle="Revenue (USD)"
        xTitle={xTitle}
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