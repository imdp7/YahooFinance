import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tables from './Table';
import { SpaceBetween } from '@cloudscape-design/components';
import { key, host } from '../../api';

const KEY_URL = `&rapidapi-key=${key}&x-rapidapi-host=${host}`;
const movers = {
  method: 'GET',
  url: 'https://yh-finance.p.rapidapi.com/market/v2/get-movers',
  params: { region: 'US', lang: 'en-US', count: '25', start: '0' },
  headers: {
    'X-RapidAPI-Key': '53858f6f17msh56f101adaa014e6p175338jsn02a3e984b0ee',
    'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
  },
};
const trending = {
  method: 'GET',
  url: 'https://yh-finance.p.rapidapi.com/market/get-trending-tickers',
  params: { region: 'US' },
  headers: {
    'X-RapidAPI-Key': '53858f6f17msh56f101adaa014e6p175338jsn02a3e984b0ee',
    'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
  },
};

function Movers() {
  const [gain, setGain] = useState([]);
  const [loser, setLoser] = useState([]);
  const [active, setActive] = useState([]);
  const [top, setTop] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const fetchTrending = async () => {
    try {
      const response = await axios.request(trending);
      let data = response?.data?.finance?.result[0]?.quotes;
      let tops = data.slice(0, 5);
      setTop(tops);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.request(movers);
      let gains = response?.data?.finance?.result[0].quotes;
      let losers = response?.data?.finance?.result[1].quotes;
      let actives = response?.data?.finance?.result[2].quotes;
      const gain = gains.slice(0, 6);
      const loser = losers.slice(0, 6);
      const active = actives.slice(0, 6);
      setGain(gain);
      setLoser(loser);
      setActive(active);
    } catch (error) {
      console.error(error);
    }
  };

  function fetchDatas(data) {
    const symbols = data.map((obj) => obj.symbol);
    const promises = symbols.map((symbol) =>
      axios.get(
        `https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=${symbol}${KEY_URL}`
      )
    );
    return Promise.all(promises)
      .then((responses) => responses.map((response) => response.data))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    setLoading(true);
    fetchTrending();
    setLoading(false);
    fetchData();
  }, [gain, loser, active, top]);
  return (
    <SpaceBetween size="m">
      <Tables top={top} header="Trending today" loading={loading} />
      <Tables gain={gain} header="Stocks: Gainers" loading={loading} />
      <Tables loser={loser} header="Stocks: Losers" loading={loading} />
      <Tables active={active} header="Stocks: Actives" loading={loading} />
    </SpaceBetween>
  );
}

export default Movers;
