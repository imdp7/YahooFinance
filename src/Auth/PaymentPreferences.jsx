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
  Flashbar,
} from '@cloudscape-design/components';
import { HelpPanels } from '../features/EC2/components/header';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { appLayoutLabels } from '../features/common/labels';
import Profile from './Components/Profile';
import Methods from './Components/Methods';
import {
  Navigation,
  userNav,
  ProfileHeader,
} from '../features/EC2/commons/common-components';

const Payment = () => {
  return (
    <SpaceBetween size="m">
      <DefaultPayment />
      <TabsContent />
    </SpaceBetween>
  );
};

const DefaultPayment = () => {
  return (
    <Container
      header={
        <Header variant="h2" actions={<Button>Edit</Button>}>
          Default payment preferences
        </Header>
      }
    >
      <SpaceBetween size="m">
        <ColumnLayout columns={4} variant="text-grid">
          <FormField label="Payment method">
            <Box>Mastercard 9441</Box>
            <Box>Darshan Patel</Box>
            <Box>Expires on 00/20xx</Box>
          </FormField>
          <FormField label="Billing address">
            <Box>12 abc road</Box>
            <Box>Seattle, California, 09090</Box>
            <Box>United States</Box>
          </FormField>
          <SpaceBetween size="m">
            <FormField label="Contact name">
              <Box>Darshan Patel</Box>
            </FormField>
            <FormField label="Phone number">
              <Box>1234567890</Box>
            </FormField>
            <FormField label="Billing contact email">
              <Box>-</Box>
            </FormField>
          </SpaceBetween>
          <SpaceBetween size="m">
            <FormField label="Service provider">
              <Box>Amazon Web Services, Inc</Box>
            </FormField>
            <FormField label="Payment currency">
              <Box>USD - US DOLLAR</Box>
            </FormField>
          </SpaceBetween>
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
};

const TabsContent = (props) => {
  const tabs = [
    {
      label: 'Payment methods',
      id: 'methods',
      content: <Methods />,
    },
    {
      label: 'Payment profiles',
      id: 'profiles',
      content: <Profile />,
    },
  ];
  return <Tabs tabs={tabs} ariaLabel="Resource details" />;
};

function PaymentPreferences(props) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('billing/paymentPreferences');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const [items, setItems] = React.useState([
    {
      type: 'info',
      dismissible: true,
      dismissLabel: 'Dismiss message',
      onDismiss: () => setItems([]),
      header: 'The new Payment preferences page is available',
      content: (
        <>
          We've redesigned the Payment methods page to the Payment preferences
          page. All legacy navigation links redirect to the new Payment
          preferences page. If you have any feedback, let us know{' '}
          <Link color="inverted">here</Link>.
        </>
      ),
      id: 'message_1',
    },
  ]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="Payment Preferences"
      des="This page shows a monthly view of your chargeable costs, along with details of your AWS services and purchases made through AWS Marketplace. Invoices are generated when a monthly billing period closes (marked as Issued status), or when subscriptions or one-time purchases are made. For monthly billing periods that haven't closed (marked as Pending status), this page will show the most recent estimated charges based on your AWS services metered to date."
      des2="If you're a management account of AWS Organizations, you can view consolidated charges for all of your member accounts, along with account level details available on the charges by account tab."
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
                        <Button external iconName="external" iconAlign="right">
                          Contact us
                        </Button>
                      </SpaceBetween>
                    }
                  >
                    Payment Preferences
                  </Header>
                }
              >
                <SpaceBetween size={'m'}>
                  <Payment
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
              {
                text: 'AWS Billing',
                href: '/account/billing/paymentPreferences',
              },
              { text: 'Payment Preferences', href: '#' },
            ]}
          />
        }
        notifications={<Flashbar items={items} stackItems />}
      />
      <AppFooter />
    </>
  );
}

export default PaymentPreferences;
