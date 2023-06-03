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
  const [loading, setLoading] = React.useState(false);

  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://yh-finance.p.rapidapi.com/stock/v2/get-analysis?symbol=${props.symbol}${KEY_URL}`
      );
      const datas = response?.data;
      setAnalysis(datas);
      setLoading(false);
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
        loading={loading}
        title={"Earnings Estimate"}
      />
      <Content
        item={analysis?.earningsTrend?.trend}
        columnDefinitions={columnDefinitionsRevenueEstimate}
        loading={loading}
        title={"Revenue Estimate"}
      />
      <Content
        item={analysis?.earningsHistory?.history}
        columnDefinitions={columnDefinitionsEarningsHistory}
        loading={loading}
        title={"Earnings History"}
      />
      <Content
        item={analysis?.earningsTrend?.trend}
        columnDefinitions={columnDefinitionsEarningsTrend}
        loading={loading}
        title={"Earnings Trend"}
      />
      <Content
        item={analysis?.earningsTrend?.trend}
        columnDefinitions={columnDefinitionsEPSRevisions}
        loading={loading}
        title={"EPS Revisions"}
      />
    </SpaceBetween>
  );
}
const Content = ({ item, columnDefinitions, loading, title }) => {
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
      header={<Header variant='h3'>{title}</Header>}
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
