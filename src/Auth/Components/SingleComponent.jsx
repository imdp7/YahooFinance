/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { AppFooter } from '../../features/common/AppFooter';
import { AppHeader } from '../../features/common/TopNavigations';
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
} from '@cloudscape-design/components';
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
import EditPayment from './EditPayment';
import EditProfile from './EditProfile';

const EditBreadcrumb = [
  { text: 'Account', href: '/account' },
  { text: 'AWS Billing', href: '/account/bills' },
  {
    text: 'Payment Preferences',
    href: `/account/billing/paymentPreferences`,
  },
  { text: 'Edit payment method', href: '#' },
];
const AddBreadcrumb = [
  { text: 'Account', href: '/account' },
  { text: 'AWS Billing', href: '/account/bills' },
  {
    text: 'Payment Preferences',
    href: `/account/billing/paymentPreferences`,
  },
  { text: 'Add payment method', href: '#' },
];
const EditProfileBreadcrumb = [
  { text: 'Account', href: '/account' },
  { text: 'AWS Billing', href: '/account/bills' },
  {
    text: 'Payment Preferences',
    href: `/account/billing/paymentPreferences`,
  },
  {
    text: 'Payment profiles',
    href: `/account/billing/paymentPreferences`,
  },
  { text: 'Edit payment profiles', href: '#' },
];

const Content = ({ info, subInfo, state, loadHelpPanelContent }, props) => {
  return (
    <>
      {subInfo === 'add' && <AddPayment {...props} />}
      {subInfo === 'edit' && <EditPayment state={state} />}
      {info === 'profiles' && <EditProfile state={state} />}
    </>
  );
};

function SinglePaymentComponent(props) {
  const { state } = useLocation();
  const { info, subInfo } = useParams();
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
                      subInfo === 'edit' ? <Button>Delete</Button> : null
                    }
                    description={state?.des}
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
            items={subInfo === 'edit' ? EditBreadcrumb : AddBreadcrumb}
          />
        }
      />
      <AppFooter />
    </>
  );
}

export default SinglePaymentComponent;
