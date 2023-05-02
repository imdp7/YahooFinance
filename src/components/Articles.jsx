import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../../api';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  SpaceBetween,
  Grid,
  Link,
  Badge,
} from '@cloudscape-design/components';
const key = '2e483bfda5mshdb59dafdf59818fp1f6fb5jsndce66f23746a';
const BASE_URL =
  'https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/list?category=';
const KEY_URL = `&region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;
function Articles(props) {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  const getTicker = (obj) => {
    const { term, label, score } = obj;
    const ticker = term.split(':')[1];
    return ticker;
  };

  const fetchNews = async () => {
    try {
      const res = await axios.request(`${BASE_URL}${props.category}${KEY_URL}`);
      const data = res.data.items.result;
      const articles = data.slice(0, `${props.limit}`);
      setNews(articles);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchNews();
  }, [props]);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }
  return (
    <SpaceBetween size="m">
      {news?.map((n) => (
        <Container key={n?.uuid}>
          <SpaceBetween size="xxs" direction="vertical">
            <Grid
              gridDefinition={[
                { colspan: { default: 3, xxs: 3 } },
                { colspan: { default: 9, xxs: 9 } },
              ]}
            >
              <img
                src={n?.main_image?.original_url}
                style={{ maxWidth: '100%' }}
                alt={n?.reference_id}
                className="article-image"
              />
              <div>
                <Box float="right">{n.publisher}</Box>
                <Link
                  onFollow={() =>
                    navigate(`/news/${n.uuid}`, {
                      state: { uuid: n?.uuid, state: n },
                    })
                  }
                >
                  <Box fontSize="heading-m" fontWeight="bold">
                    {n?.title}
                  </Box>
                </Link>
                <Box>{truncate(n.summary, 400)}</Box>
              </div>
            </Grid>

            <SpaceBetween size="xs" direction="horizontal">
              {n.entities.map((e) => (
                <div key={e?.term}>
                  <Link href={`/stocks/${getTicker(e)}`}>
                    <Badge className="badge-style" color="blue">
                      {getTicker(e)}
                    </Badge>
                  </Link>
                </div>
              ))}
            </SpaceBetween>
          </SpaceBetween>
        </Container>
      ))}
    </SpaceBetween>
  );
}

export default Articles;
