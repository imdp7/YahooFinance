import * as React from 'react';
import {
  LineChart,
  BarChart,
  Box,
  Container,
  Header,
  Button,
  SpaceBetween,
  Link,
} from '@cloudscape-design/components';
import axios from 'axios';
import { key, host } from '../../api';
import { InfoLink, HelpPanels } from '../components/common/InfoLink';
const BASE_URL = 'https://yh-finance.p.rapidapi.com/stock/v3/get-chart?';
const KEY_URL = `&region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;

export function Graph(props) {
  const {
    summary = props?.profile?.summaryDetail,
    earnings = props?.profile?.earnings,
    profile = props.profile,
    symbol = props.symbol,
  } = props;
  const [loading, setLoading] = React.useState('finished');
  const [graphData, setGraphData] = React.useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}interval=1d&symbol=${symbol}&range=1mo&includePrePost=true&useYfid=true&includeAdjustedClose=true${KEY_URL}`
      );
      const data = response?.data?.chart?.result[0];
      setGraphData(data);
    } catch (e) {
      console.log(e)
    }
  };

  React.useEffect(() => {
    setLoading('loading');
    fetchData();
    setLoading('finished');
  }, []);

const timestamps = graphData?.timestamp || [];
const prices = graphData?.indicators?.adjclose[0]?.adjclose || [];

  const transformData = (timestamps, prices) => {
    if(timestamps.length !== prices.length){
      throw new Error("Timestamp ad prices arrays doesn't match the same length")
    }
    return timestamps?.map((timestamp, index) => ({
      x: new Date(timestamp),
      y: prices[index],
    }))
  }
  return (
    <LineChart
      statusType={loading}
      errorText="Error loading data."
      loadingText="Loading chart"
      recoveryText="Retry"
      series={[
        {
          type: 'line',
          data: transformData(timestamps, prices)
        },
      ]}
      xDomain={[new Date(timestamps[0]), new Date(timestamps.length - 1)]}
      yDomain={[Math.min(...prices), Math.max(...prices)]}
      i18nStrings={{
        filterLabel: 'Filter displayed data',
        filterPlaceholder: 'Filter data',
        filterSelectedAriaLabel: 'selected',
        detailPopoverDismissAriaLabel: 'Dismiss',
        legendAriaLabel: 'Legend',
        chartAriaRoleDescription: 'line chart',
        xTickFormatter: (e) => new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: 'numeric',
          hour12:false,
        }).format(e)
      }}
      ariaLabel="Single data series line chart"
      height={300}
      hideFilter
      hideLegend
      xScaleType="time"
      xTitle="Time (EST)"
      xTickFormatter={(e) => e.getHours()}
      yTitle={
        <SpaceBetween size="s" direction="horizontal">
          <Link>1D</Link>
          <Link>5D</Link>
          <Link>1M</Link>
          <Link>6M</Link>
          <Link>YTD</Link>
          <Link>1Y</Link>
          <Link>5Y</Link>
          <Link>Max</Link>
        </SpaceBetween>
      }
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data available</b>
          <Box variant="p" color="inherit">
            There is no data available
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <b>No matching data</b>
          <Box variant="p" color="inherit">
            There is no matching data to display
          </Box>
          <Button>Clear filter</Button>
        </Box>
      }
    />
  );
}

export function TrendGraph({ loadHelpPanelContent }) {
  // const { profile } = props;
  const [loading, setLoading] = React.useState('finished');

  React.useEffect(() => {
    setLoading('loading');
    const timer = setTimeout(() => {
      setLoading('finished');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Container
      header={
        <Header
          variant="h3"
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
          }
        >
          Recomendation Trend
        </Header>
      }
    >
      <BarChart
        series={[
          {
            title: 'Site 1',
            type: 'bar',
            data: [
              { x: new Date(1601092800000), y: 34503 },
              { x: new Date(1601100000000), y: 25832 },
              { x: new Date(1601107200000), y: 4012 },
              { x: new Date(1601114400000), y: -5602 },
              { x: new Date(1601121600000), y: 17839 },
            ],
            valueFormatter: (e) => '$' + e.toLocaleString('en-US'),
          },
          {
            title: 'Average revenue',
            type: 'threshold',
            y: 19104,
            data: [
              { x: new Date(1601092800000), y: 34503 },
              { x: new Date(1601100000000), y: 25832 },
              { x: new Date(1601107200000), y: 4012 },
              { x: new Date(1601114400000), y: -5602 },
              { x: new Date(1601121600000), y: 17839 },
            ],
            valueFormatter: (e) => '$' + e.toLocaleString('en-US'),
          },
        ]}
        xDomain={[
          new Date(1601092800000),
          new Date(1601100000000),
          new Date(1601107200000),
          new Date(1601114400000),
          new Date(1601121600000),
        ]}
        yDomain={[-10000, 40000]}
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          detailPopoverDismissAriaLabel: 'Dismiss',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'line chart',
          xTickFormatter: (e) =>
            e
              .toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: !1,
              })
              .split(',')
              .join('\n'),
          yTickFormatter: function o(e) {
            return Math.abs(e) >= 1e9
              ? (e / 1e9).toFixed(1).replace(/\.0$/, '') + 'G'
              : Math.abs(e) >= 1e6
              ? (e / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
              : Math.abs(e) >= 1e3
              ? (e / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
              : e.toFixed(2);
          },
        }}
        ariaLabel="Single data series line chart"
        errorText="Error loading data."
        height={300}
        loadingText="Loading chart"
        recoveryText="Retry"
        statusType={loading}
        hideFilter
        hideLegend
        xScaleType="categorical"
        xTitle="Time (UTC)"
        yTitle="Revenue (USD)"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no data available
            </Box>
          </Box>
        }
        noMatch={
          <Box textAlign="center" color="inherit">
            <b>No matching data</b>
            <Box variant="p" color="inherit">
              There is no matching data to display
            </Box>
            <Button>Clear filter</Button>
          </Box>
        }
      />
    </Container>
  );
}
