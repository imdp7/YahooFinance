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
const key = '0116a201b2msh2c344a4ee93f681p193bdbjsn940a9d284c84';
const BASE_URL =
  'https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/list?category=';
const KEY_URL = `&region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;

function Article(props) {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  const getTicker = (obj) => {
    const { term, label, score } = obj;
    const ticker = term.split(':')[1];
    return ticker;
  };

  const fetchNews = async () => {
    try {
      const res = await axios.request(`https://api.polygon.io/v2/reference/news?ticker=${props.category}&limit=15&apiKey=tNspjXd0liysppgjJpI0ELqEjWWT6MoE`);
      const data = res.data?.results;
      setNews(data);
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
        <Container key={n?.id}>
          <SpaceBetween size="xxs" direction="vertical">
            <Grid
              gridDefinition={[
                { colspan: { default: 3, xxs: 3 } },
                { colspan: { default: 9, xxs: 9 } },
              ]}
            >
              <img
                src={`${n?.image_url}?apiKey=tNspjXd0liysppgjJpI0ELqEjWWT6MoE`}
                style={{ maxWidth: '100%' }}
                alt={n?.article_url}
                className="article-image"
              />
              <div>
                <Box float="right">{n.publisher.name}</Box>
                <Link
                  onFollow={() =>
                    navigate(`/news/${n.id}`, {
                      state: { uuid: n?.id, state: n },
                    })
                  }
                >
                  <Box fontSize="heading-m" fontWeight="bold">
                    {n?.title}
                  </Box>
                </Link>
                <Box>{truncate(n.description, 400)}</Box>
              </div>
            </Grid>

            <SpaceBetween size="xs" direction="horizontal">
              {n.tickers.map((e) => (
                <div key={e}>
                  <Link href={`/stocks/${e}`}>
                    <Badge className="badge-style" color="blue">
                      {e}
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

export default Article;