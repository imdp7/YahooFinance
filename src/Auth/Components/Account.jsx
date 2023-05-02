import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Spinner,
  SpaceBetween,
  Table,
  Pagination,
  FormField,
  TextFilter,
  Box,
} from '@cloudscape-design/components';
import { SettingsButton } from '../Bills';
import { COLUMN_DEFINITIONS_SERVICE } from './TableFilter';
function Account(props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
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
          Charges by account
        </Header>
      }
    >
      <SpaceBetween size="l">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <FormField label="Total active accounts">
              <Box>{!loading ? '0' : <Spinner />}</Box>
            </FormField>
          </Box>
          <Box float="right">
            <FormField label="Total post-tax account charges in USD">
              <Box float="right">{!loading ? 'USD 0.00' : <Spinner />}</Box>
            </FormField>
          </Box>
        </div>
        <Table
          columnDefinitions={COLUMN_DEFINITIONS_SERVICE}
          items={[]}
          variant="embedded"
          loading={loading}
          loadingText="Loading changes to account data"
          trackBy="name"
          visibleColumns={['description', 'usageQty', 'amount']}
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
  );
}

export default Account;
