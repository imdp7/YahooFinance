import React from "react";
import { polygon } from "../../api";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  SpaceBetween,
  Grid,
  Link,
  Badge,
  Spinner,
  Flashbar
} from "@cloudscape-design/components";

function Article({news, isLoading}) {
  const navigate = useNavigate();
  const [items, setItems] = React.useState([
    {
      type: "warning",
      content: "No more news articles.",
      dismissible: true,
      dismissLabel: "Dismiss message",
      onDismiss: () => setItems([]),
      id: "message_1"
    }
  ]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
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
              ]}>
              <img
                src={`${n?.image_url}?apiKey=${polygon}`}
                style={{ maxWidth: "100%" }}
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
                  }>
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
      {isLoading && <Spinner size="large" className="spinner" />}
      {!news.nextUrl && !isLoading && <Flashbar items={items} />}
      <div className="observer-element" style={{ height: '10px' }} />
    </SpaceBetween>
  );
}

export default Article;
