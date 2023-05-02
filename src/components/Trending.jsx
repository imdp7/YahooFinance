import React, { useState, useEffect } from 'react';
import {
  Cards,
  Link,
  Box,
  Table,
  SpaceBetween,
} from '@cloudscape-design/components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const movers = {
  method: 'GET',
  url: 'https://yh-finance.p.rapidapi.com/market/get-trending-tickers',
  params: { region: 'US' },
  headers: {
    'X-RapidAPI-Key': '53858f6f17msh56f101adaa014e6p175338jsn02a3e984b0ee',
    'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
  },
};

function Trending() {
  const navigate = useNavigate();
  const [top, setTop] = useState([]);
  const [profile, setProfile] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.request(movers);
      let data = response?.data?.finance?.result[0]?.quotes;
      let tops = data.slice(0, 5);
      setTop(tops);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Table
        columnDefinitions={[
          {
            id: 'name',
            header: 'Symbol',
            maxWidth: '100px',
            cell: (item) => (
              <SpaceBetween size="xxxs" direction="vertical">
                <Link
                  onFollow={() => navigate(`stocks/${item.symbol}`)}
                  fontSize="heading-xs"
                >
                  {item.symbol}
                </Link>
                <Box color="text-body-secondary" fontSize="body-s">
                  {item.shortName}
                </Box>
              </SpaceBetween>
            ),
            sortingField: 'name',
          },
          {
            id: 'price',
            header: 'Price',
            cell: (item) => <Box>${item?.regularMarketPrice.toFixed(2)}</Box>,
            sortingField: 'price',
          },
          {
            id: 'change',
            header: 'Change',
            cell: (item) => (
              <span
                style={{
                  color: item.regularMarketChange < 0 ? 'red' : 'green',
                }}
              >
                {item?.regularMarketChange.toFixed(2)}
              </span>
            ),
          },
          {
            id: 'changePer',
            header: '% Change',
            cell: (item) => (
              <span
                style={{
                  color: item.regularMarketChangePercent < 0 ? 'red' : 'green',
                }}
              >
                {item?.regularMarketChangePercent.toFixed(2)}%
              </span>
            ),
          },
        ]}
        items={top}
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
    </div>
  );
}

export default Trending;
