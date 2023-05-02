import React from 'react';
import {
  Cards,
  Link,
  Box,
  Table,
  Container,
  SpaceBetween,
  Header,
} from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';
import { InfoLink, HelpPanels } from '../components/common/InfoLink';

function Tables({
  top,
  active,
  gain,
  loser,
  recommend,
  header,
  loading,
  loadHelpPanelContent,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <Container
        header={
          <Header
            variant="h3"
            info={
              <InfoLink
                onFollow={() =>
                  loadHelpPanelContent(
                    <HelpPanels
                      title="Recommended Stocks"
                      des={`View the latest ${header}.`}
                    />
                  )
                }
              />
            }
          >
            {header}
          </Header>
        }
        footer={
          <Box textAlign="center">
            <Link href="/console/services">View all</Link>
          </Box>
        }
      >
        <Table
          columnDefinitions={[
            {
              id: 'name',
              header: 'Symbol',
              cell: (item) => (
                <SpaceBetween size="xxxs" direction="vertical">
                  <Link
                    onFollow={() => navigate(`/stocks/${item.symbol}`)}
                    fontSize="heading-xs"
                  >
                    {item.symbol}
                  </Link>
                  <Box color="text-body-secondary" fontSize="body-s">
                    {item?.shortName}
                  </Box>
                </SpaceBetween>
              ),
              sortingField: 'name',
            },
            {
              id: 'price',
              header: 'Price',
              cell: (item) => (
                <Box fontWeight="bold">
                  ${item?.regularMarketPrice?.toFixed(2)}
                </Box>
              ),
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
                  {item?.regularMarketChange?.toFixed(2)}
                </span>
              ),
            },
            {
              id: 'changePer',
              header: '% Change',
              cell: (item) => (
                <span
                  style={{
                    color:
                      item.regularMarketChangePercent < 0 ? 'red' : 'green',
                  }}
                >
                  {item?.regularMarketChangePercent?.toFixed(2)}%
                </span>
              ),
            },
          ]}
          items={top || active || loser || gain || recommend}
          loadingText="Loading resources"
          loading={loading}
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
      </Container>
    </div>
  );
}

export default Tables;
