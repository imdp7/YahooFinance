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
import { SettingsButton } from '../Bills';
import {
  COLUMN_DEFINITIONS_INVOICES,
  COLUMN_DEFINITIONS_TAX_INVOICES,
} from './TableFilter';
function Invoices(props) {
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
            Amazon Web Services, Inc. invoices
          </Header>
        }
      >
        <SpaceBetween size="l">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <FormField label="Total number of invoices">
                <Box>{!loading ? '0' : <Spinner />}</Box>
              </FormField>
            </Box>
            <Box float="right">
              <FormField label="Total invoices in USD">
                <Box float="right">{!loading ? 'USD 0.00' : <Spinner />}</Box>
              </FormField>
            </Box>
          </div>
          <Table
            columnDefinitions={COLUMN_DEFINITIONS_INVOICES}
            loading={loading}
            items={[]}
            variant="embedded"
            loadingText="Loading changes in invoices"
            trackBy="name"
            visibleColumns={[
              'chargeType',
              'documentType',
              'invoiceID',
              'invoiceDate',
              'total',
            ]}
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
      <Container
        header={
          <Header
            variant="h2"
            description="Tax invoices for all applicable service providers"
            actions={<SettingsButton />}
          >
            Tax invoices
          </Header>
        }
      >
        <SpaceBetween size="m">
          <FormField label="Total number of tax invoices">
            <Box>{!loading ? '0' : <Spinner />}</Box>
          </FormField>
          <Table
            columnDefinitions={COLUMN_DEFINITIONS_TAX_INVOICES}
            items={[]}
            loading={loading}
            variant="embedded"
            loadingText="Loading changes in tax invoices"
            trackBy="name"
            visibleColumns={[
              'provider',
              'documentType',
              'documentID',
              'invoiceID',
            ]}
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

export default Invoices;
