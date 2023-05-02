import React from 'react';
import axios from 'axios';
import { key, host } from '../../api';
import {
  ColumnLayout,
  Container,
  Header,
  Box,
  Grid,
  Link,
  ProgressBar,
  SpaceBetween,
} from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

const BASE_URL =
  'https://yh-finance.p.rapidapi.com/market/get-popular-watchlists?';
const KEY_URL = `rapidapi-key=${key}&x-rapidapi-host=${host}`;

function PopularWatchlist() {
  const navigate = useNavigate();
  const [watchList, setWatchList] = React.useState([]);
  const fetchWatchlist = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${KEY_URL}`);
      const watch = response?.data?.finance?.result[0];
      setWatchList(watch);
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    fetchWatchlist();
  }, []);
  return (
    <SpaceBetween size="m">
      <Container
        header={
          <Header variant="h3" counter={watchList.total && watchList.total}>
            {watchList?.name}
          </Header>
        }
      >
        <SpaceBetween size="m">
          <ColumnLayout columns={4}>
            {watchList?.portfolios?.map((w) => (
              <Link
                key={w?.pfId}
                onFollow={() =>
                  navigate(`/watchlist/${w?.slug}`, {
                    state: { pfId: w?.pfId, userId: w?.userId, state: w },
                  })
                }
              >
                <Box fontSize="heading-s" fontWeight="bold">
                  {w.name}
                </Box>
              </Link>
            ))}
          </ColumnLayout>
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}

export default PopularWatchlist;
