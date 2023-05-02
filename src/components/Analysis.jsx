import React from 'react';
import {
  SpaceBetween,
  Container,
  Box,
  Header,
  Link,
  ColumnLayout,
  Table,
} from '@cloudscape-design/components';
import axios from 'axios';
import { key, host } from '../../api';
import {
  columnDefinitionsEarningsEstimate,
  columnDefinitionsRevenueEstimate,
  columnDefinitionsEarningsTrend,
  columnDefinitionsEarningsHistory,
  columnDefinitionsEPSRevisions,
} from './common/Table';

const KEY_URL = `&region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;
function Analysis(props) {
  const [analysis, setAnalysis] = React.useState([]);

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get(
        `https://yh-finance.p.rapidapi.com/stock/v2/get-analysis?symbol=${props.symbol}${KEY_URL}`
      );
      const datas = response?.data;
      setAnalysis(datas);
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    fetchAnalysis();
  }, [props.symbol]);

  return (
    <SpaceBetween size="m">
      <Content
        item={analysis?.earningsTrend?.trend}
        columnDefinitions={columnDefinitionsEarningsEstimate}
      />
      <Content
        item={analysis?.earningsTrend?.trend}
        columnDefinitions={columnDefinitionsRevenueEstimate}
      />
      <Content
        item={analysis?.earningsHistory?.history}
        columnDefinitions={columnDefinitionsEarningsHistory}
      />
      <Content
        item={analysis?.earningsTrend?.trend}
        columnDefinitions={columnDefinitionsEarningsTrend}
      />
      <Content
        item={analysis?.earningsTrend?.trend}
        columnDefinitions={columnDefinitionsEPSRevisions}
      />
    </SpaceBetween>
  );
}
const Content = ({ item, columnDefinitions }) => {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      return () => clearTimeout(timer);
    }, 1500);
  }, []);
  return (
    <Table
      columnDefinitions={columnDefinitions}
      items={item}
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
  );
};

export default Analysis;
