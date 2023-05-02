/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { AppFooter } from '../../features/common/AppFooter';
import { AppHeader } from '../../features/common/TopNavigations';
import {
  AppLayout,
  Button,
  Container,
  Popover,
  DatePicker,
  Input,
  Box,
  ContentLayout,
  Header,
  BreadcrumbGroup,
  Badge,
  SpaceBetween,
  Spinner,
  ColumnLayout,
  Grid,
  FormField,
} from '@@cloudscape-design/components';
import { HelpPanels } from '../../features/EC2/components/header';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { appLayoutLabels } from '../../features/common/labels';
import {
  Navigation,
  userNav,
  ProfileHeader,
} from '../../features/EC2/commons/common-components';
import { useLocation, useParams } from 'react-router-dom';
import AddPayment from './AddPayment';

const Content = ({ info, subInfo, state, loadHelpPanelContent, id }, props) => {
  const { details } = state;
  const [expiry, setExpiry] = useState(details.expiry);
  const [name, setName] = useState(details.name);
  const [fullName, setFullName] = useState(details.name);
  return (
    <>
      {subInfo === 'add' && <AddPayment {...props} />}
      <SpaceBetween size="m">
        <Container
          header={<Header variant="h2">Payment method details</Header>}
        >
          <SpaceBetween size="m">
            <Grid
              gridDefinition={[{ colspan: 0 }, { colspan: 0 }, { colspan: 0 }]}
            >
              <Box fontSize="heading-s" variant="h1">
                {details.card}
              </Box>
              <img
                src={details.image}
                width="40px"
                height="30px"
                alt="compactImage"
              />
              {details.type == 'Default' && (
                <Badge color="blue">{details.type}</Badge>
              )}
            </Grid>
            <FormField label="Expiry date">
              <DatePicker
                step={2}
                onChange={({ detail }) => {
                  setExpiry(detail.value);
                }}
                value={expiry}
                openCalendarAriaLabel={(selectedDate) =>
                  'Choose certificate expiry date' +
                  (selectedDate ? `, selected date is ${selectedDate}` : '')
                }
                nextMonthAriaLabel="Next month"
                placeholder="YYYY/MM"
                previousMonthAriaLabel="Previous month"
                todayAriaLabel="Today"
              />
            </FormField>
            <FormField label="Name on card">
              <Input
                className="input-width-name"
                value={name}
                onChange={({ detail }) => setName(detail.value)}
              />
            </FormField>
          </SpaceBetween>
        </Container>
        <Container header={<Header variant="h2">Billing address</Header>}>
          <SpaceBetween size="m">
            <FormField label="Full name">
              <Input
                className="input-width-name"
                value={fullName}
                onChange={({ detail }) => setFullName(detail.value)}
              />
            </FormField>
          </SpaceBetween>
        </Container>
      </SpaceBetween>
    </>
  );
};

function EditComponent(props) {
  const { state } = useLocation();
  const { info, subInfo, id } = useParams();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('billing/paymentPreferences');
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
    document.title = 'Add Payment Method | Billing management console';
  }, [location]);
  const capital = (text) => {
    return text[0].toUpperCase() + text.slice(1);
  };
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
                      <Button disabled={state.details.type === 'Default'}>
                        Delete
                      </Button>
                    }
                  >
                    {state?.title}
                  </Header>
                }
              >
                <SpaceBetween size={'m'}>
                  <Content
                    state={state}
                    info={info}
                    subInfo={subInfo}
                    id={id}
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
        contentType="wizard"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Account', href: '/account' },
              { text: 'AWS Billing', href: '/account/billing/bills' },
              {
                text: 'Payment Preferences',
                href: `/account/billing/bills/${info}`,
              },
              {
                text: 'Edit payment preferences',
                href: `#`,
              },
            ]}
          />
        }
      />
      <AppFooter />
    </>
  );
}

export default EditComponent;
