/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { AppFooter } from '../features/common/AppFooter';
import { AppHeader } from '../features/common/TopNavigations';
import {
  AppLayout,
  Button,
  Container,
  Popover,
  ContentLayout,
  Header,
  BreadcrumbGroup,
  ButtonDropdown,
  SpaceBetween,
  Spinner,
  ColumnLayout,
  Box,
  ExpandableSection,
  Grid,
  CollectionPreferences,
  Pagination,
  TextFilter,
  Table,
  FormField,
  Tabs,
  Link,
  Select,
  StatusIndicator,
} from '@cloudscape-design/components';
import { HelpPanels } from '../features/EC2/components/header';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { appLayoutLabels } from '../features/common/labels';

import {
  Navigation,
  userNav,
  ProfileHeader,
} from '../features/EC2/commons/common-components';
import Service from './Components/Service';
import Account from './Components/Account';
import Invoices from './Components/Invoices';
import Savings from './Components/Savings';
import Taxes from './Components/Taxes';
import { COLUMN_DEFINITIONS_PAYMENT } from './Components/TableFilter';

const SummaryInfo = ({ loadHelpPanelContent }) => {
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
          description="Total charges and payment information"
          info={<Link>Info</Link>}
        >
          AWS estimated bill summary
        </Header>
      }
    >
      <SpaceBetween size="xl">
        <Grid
          gridDefinition={[
            { colspan: { default: 4, xxs: 12 } },
            { colspan: { default: 3, xxs: 9 } },
            { colspan: { default: 3, xxs: 3 } },
            { colspan: { default: 9, xxs: 10 } },
          ]}
        >
          <ColumnLayout columns={3} variant="text-grid">
            <FormField label="Account ID">
              <Box>610741917922</Box>
            </FormField>
            <FormField label="Billing period">
              <Box>March 1 - March 31, 2023</Box>
            </FormField>
            <FormField label="Bill status">
              <StatusIndicator type="pending">Pending</StatusIndicator>
            </FormField>
          </ColumnLayout>
          <Box float="right">
            <FormField label="Service provider">
              <Box variant="awsui-key-label" fontSize="heading-m">
                Amazon Web Services, Inc.
              </Box>
            </FormField>
          </Box>
          <Box float="right">
            <FormField label="Total in USD">
              <Box variant="awsui-key-label" fontSize="heading-m">
                {!loading ? 'USD 0.00' : <Spinner />}
              </Box>
            </FormField>
          </Box>
          <Box float="right">
            <Box variant="awsui-key-label" fontSize="heading-xl">
              Estimated grand total:
            </Box>
          </Box>
          <Box float="right">
            <Box color="text-status-info" display="inline">
              <Popover
                header="Estimated grand total in preferred payment currency:"
                size="medium"
                triggerType="text"
                content={
                  <>
                    <p>{!loading ? 'USD 0.00' : <Spinner />}</p>
                    <Link external>Learn more</Link>
                  </>
                }
                renderWithPortal={true}
                dismissAriaLabel="Close"
              >
                <Box
                  color="text-status-info"
                  fontSize="heading-xl"
                  fontWeight="bold"
                >
                  {!loading ? '$0.00' : <Spinner />}
                </Box>
              </Popover>
            </Box>
          </Box>
        </Grid>
        <PaymentInformation />
      </SpaceBetween>
    </Container>
  );
};

const PaymentInformation = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <ExpandableSection headerText="Payment information" variant="footer">
      <SpaceBetween size="m">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <FormField label="Total number of payments">
              <Box>{!loading ? '0' : <Spinner />}</Box>
            </FormField>
          </Box>
          <Box float="right">
            <FormField label="Total received payments in USD">
              <Box>{!loading ? 'USD 0.00' : <Spinner />}</Box>
            </FormField>
          </Box>
        </div>
        <Table
          columnDefinitions={COLUMN_DEFINITIONS_PAYMENT}
          items={[]}
          variant="embedded"
          loadingText="Loading changes in payment information"
          loading={loading}
          trackBy="name"
          visibleColumns={[
            'provider',
            'type',
            'DocumentType',
            'invoiceID',
            'paymentStatus',
            'PaymentReceivedDate',
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
              filteringPlaceholder="Find resources"
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
          preferences={
            <CollectionPreferences
              title="Preferences"
              confirmLabel="Confirm"
              cancelLabel="Cancel"
              preferences={{
                pageSize: 10,
                visibleContent: ['variable', 'value', 'type', 'description'],
              }}
              pageSizePreference={{
                title: 'Select page size',
                options: [
                  { value: 10, label: '10 resources' },
                  { value: 20, label: '20 resources' },
                ],
              }}
              visibleContentPreference={{
                title: 'Select visible content',
                options: [
                  {
                    label: 'Main distribution properties',
                    options: [
                      {
                        id: 'variable',
                        label: 'Variable name',
                        editable: false,
                      },
                      { id: 'value', label: 'Text value' },
                      { id: 'type', label: 'Type' },
                      {
                        id: 'description',
                        label: 'Description',
                      },
                    ],
                  },
                ],
              }}
            />
          }
        />
      </SpaceBetween>
    </ExpandableSection>
  );
};
const HighestEstimated = () => {
  const [selectedOption, setSelectedOption] = useState({
    value: 'Amazon Web Services, Inc.',
  });
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Viewing Amazon Web Services, Inc."
          actions={
            <SpaceBetween size="m" direction="horizontal">
              <Select
                selectedOption={selectedOption}
                onChange={({ detail }) =>
                  setSelectedOption(detail.selectedOption)
                }
                options={[
                  {
                    value: 'Amazon Web Services, Inc.',
                    label: 'Amazon Web Services, Inc.',
                  },
                ]}
              />
              <SettingsButton />
            </SpaceBetween>
          }
        >
          Highest estimated cost by service provider
        </Header>
      }
    >
      <SpaceBetween size="m">
        <ColumnLayout columns={2} variant="text-grid">
          <ColumnLayout columns={2}>
            <FormField label="Highest service spend">
              <Box>USD 0.00</Box>
            </FormField>
            <FormField label="Trend compared to prior month">
              <Box>No data to display.</Box>
            </FormField>
            <FormField label="Service name">
              <Box>Elastic Compute Cloud</Box>
            </FormField>
          </ColumnLayout>
          <ColumnLayout columns={2}>
            <FormField label="Highest AWS Region spend">
              <Box>USD 0.00</Box>
            </FormField>
            <FormField label="Trend compared to prior month">
              <Box>No data to display.</Box>
            </FormField>
            <FormField label="Region name">
              <Box>US East (N. Virginia)</Box>
            </FormField>
          </ColumnLayout>
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
};
const TabsContent = (props) => {
  const tabs = [
    {
      label: 'Charges by service',
      id: 'service',
      content: <Service />,
    },
    {
      label: 'Charges by account',
      id: 'account',
      content: <Account />,
    },
    {
      label: 'Invoices',
      id: 'Invoices',
      content: <Invoices />,
    },
    {
      label: 'Savings',
      id: 'Savings',
      content: <Savings />,
    },
    {
      label: 'Taxes by service',
      id: 'Taxes',
      content: <Taxes />,
    },
  ];
  return <Tabs tabs={tabs} ariaLabel="Resource details" />;
};
const Profiler = (props) => {
  return (
    <>
      <SpaceBetween size="m">
        <SummaryInfo {...props} />
        <HighestEstimated />
        <TabsContent />
        <Box color="text-status-inactive" fontSize="body-s" variant="p">
          Usage and recurring charges for this statement period will be charged
          on your next billing date. Estimated charges shown on this page, or
          shown on any notifications that we send to you, may differ from your
          actual charges for this statement period. This is because estimated
          charges presented on this page do not include usage charges accrued
          during this statement period after the date you view this page.
          Similarly, information about estimated charges sent to you in a
          notification do not include usage charges accrued during this
          statement period after the date we send you the notification. One-time
          fees and subscription charges are assessed separately from usage and
          reoccurring charges, on the date that they occur. The charges on this
          page exclude taxes, unless it is listed as a separate line item. To
          access your tax information, contact your AWS Organization’s
          management owner.
        </Box>
      </SpaceBetween>
    </>
  );
};

export const SettingsButton = (props) => {
  const [preferences, setPreferences] = React.useState({
    pageSize: 10,
    wrapLines: true,
    visibleContent: ['id', 'domainName', 'deliveryMethod'],
  });
  return (
    <CollectionPreferences
      onConfirm={({ detail }) => setPreferences(detail)}
      preferences={preferences}
      pageSizePreference={{
        title: 'Select page size',
        options: [
          { value: 10, label: '10 resources' },
          { value: 20, label: '20 resources' },
        ],
      }}
      wrapLinesPreference={{
        label: 'Wrap lines',
        description: 'Wrap lines description',
      }}
      stripedRowsPreference={{
        label: 'Striped rows',
        description: 'Striped rows description',
      }}
      contentDensityPreference={{
        label: 'Compact mode',
        description: 'Content density description',
      }}
      visibleContentPreference={{
        title: 'Select visible content',
        options: [
          {
            label: 'Main distribution properties',
            options: [
              {
                id: 'id',
                label: 'Distribution ID',
                editable: false,
              },
              { id: 'domainName', label: 'Domain name' },
              {
                id: 'deliveryMethod',
                label: 'Delivery method',
              },
            ],
          },
          {
            label: 'Secondary distribution properties',
            options: [
              { id: 'priceClass', label: 'Price class' },
              {
                id: 'sslCertificate',
                label: 'SSL certificate',
              },
              { id: 'origin', label: 'Origin' },
            ],
          },
        ],
      }}
      cancelLabel="Cancel"
      confirmLabel="Confirm"
      title="Preferences"
    />
  );
};

function Bills(props) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('/account/bills');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="Bills"
      des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
        resizeable computing capacity&mdash;literally, servers in Amazon's data
        centers&mdash;that you use to build and host your software systems."
    />
  );

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };
  useEffect(() => {
    document.title = 'Billing management console';
  }, [location]);

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        content={
          <Provider store={store}>
            {!loading ? (
              <ContentLayout
                header={
                  <Header
                    actions={
                      <SpaceBetween size="m" direction="horizontal">
                        <Button iconName="download">Download all to CSV</Button>
                        <Button>Print</Button>
                        <ButtonDropdown
                          expandableGroups
                          expandToViewport
                          variant="primary"
                          items={[
                            { text: 'March 2023', id: '1', disabled: false },
                            { text: 'February 2023', id: '2', disabled: false },
                            { text: 'January 2023', id: '3' },
                            {
                              id: '4',
                              text: '2022',
                              items: [
                                { id: 'p_1', text: 'December 2022' },
                                { id: 'p_2', text: 'November 2022' },
                                {
                                  id: 'p_3',
                                  text: 'October 2022',
                                },
                                {
                                  id: 'p_4',
                                  text: 'September 2022',
                                },
                                { id: 'p_5', text: 'August 2022' },
                                { id: 'p_6', text: 'July 2022' },
                                { id: 'p_7', text: 'June 2022' },
                              ],
                            },
                          ]}
                        >
                          March 2023
                        </ButtonDropdown>
                        <SettingsButton />
                      </SpaceBetween>
                    }
                  >
                    Bills
                  </Header>
                }
              >
                <SpaceBetween size={'m'}>
                  <Profiler
                    loadHelpPanelContent={loadHelpPanelContent}
                    {...props}
                  />
                </SpaceBetween>
              </ContentLayout>
            ) : (
              <Spinner size="large" className="spinner" />
            )}
          </Provider>
        }
        headerSelector="#h"
        footerSelector="#f"
        navigation={
          <Navigation
            activeHref={activeHref}
            onFollow={(event) => {
              if (!event.detail.external) {
                event.preventDefault();
                setActiveHref(event.detail.href);
              }
            }}
            items={userNav}
            header={ProfileHeader}
          />
        }
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        contentType="table"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Account', href: '/account' },
              { text: 'Bills', href: '/bills' },
            ]}
          />
        }
      />
      <AppFooter />
    </>
  );
}

export default Bills;
