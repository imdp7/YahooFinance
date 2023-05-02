import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  SpaceBetween,
  Table,
  Pagination,
  FormField,
  TextFilter,
  Box,
  Spinner,
} from '@cloudscape-design/components';
import { COLUMN_DEFINITIONS_TAXES } from './TableFilter';
import { SettingsButton } from '../Bills';
function Taxes(props) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <SpaceBetween size="m">
      <Container
        header={
          <Header
            variant="h2"
            actions={
              <SpaceBetween size="m" direction="horizontal">
                <SettingsButton />
              </SpaceBetween>
            }
          >
            Amazon Web Services, Inc. taxes by service
          </Header>
        }
      >
        <SpaceBetween size="l">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <FormField label="Total taxed services">
                <Box>{!loading ? '0' : <Spinner />}</Box>
              </FormField>
            </Box>
            <Box float="right">
              <FormField label="Total tax in USD">
                <Box float="right">{!loading ? 'USD 0.00' : <Spinner />}</Box>
              </FormField>
            </Box>
          </div>
          <Table
            columnDefinitions={COLUMN_DEFINITIONS_TAXES}
            items={[]}
            loading={loading}
            variant="embedded"
            loadingText="Loading changes in taxes"
            trackBy="name"
            visibleColumns={['name', 'postTax', 'preTax', 'tax']}
            empty={
              <Box textAlign="center" color="inherit">
                <b>No data</b>
                <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                  There is no data to display.
                </Box>
              </Box>
            }
            filter={
              <TextFilter
                filteringPlaceholder="Filter by service name or region name"
                filteringText=""
              />
            }
            pagination={
              <Pagination
                currentPageIndex={1}
                pagesCount={1}
                ariaLabels={{
                  nextPageLabel: 'Next page',
                  previousPageLabel: 'Previous page',
                  pageLabel: (pageNumber) => `Page ${pageNumber} of all pages`,
                }}
              />
            }
          />
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}

export default Taxes;
