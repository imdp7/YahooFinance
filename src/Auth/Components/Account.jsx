import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Spinner,
  SpaceBetween,
  ContentLayout,
  ColumnLayout,
  StatusIndicator,
  FormField,
  Link,
  Box,
  Modal,
  Alert,
  AppLayout,
  ExpandableSection,
  Button,
} from "@cloudscape-design/components";
import { appLayoutLabels } from "../../features/common/labels";
import { AppFooter } from "../../features/common/AppFooter";
import CommonHeader from "../../components/common/CommonHeader";
import Stripe from "stripe";
import TopNavigations from "../../components/TopNavigation";

const stripe = new Stripe(
  "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"
);
const Content = ({ activeSubscription, invoices, cancelSubscription, resumeSubscription }) => {
  console.log(activeSubscription)
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const statusType = (status) => {
    if (status === "active" || status === "paid") {
      return <StatusIndicator>{capital(status)}</StatusIndicator>;
    } else if (status === "trialing" || status === "pending") {
      return (
        <StatusIndicator type="warning">{capital("inactive") || capital(status)}</StatusIndicator>
      );
    } else if (status === "stopped") {
      return <StatusIndicator type="error">{capital(status)}</StatusIndicator>;
    } else if (status === "past_due") {
      return <StatusIndicator type="error">{capital(status)}</StatusIndicator>;
    }
  };
  const timestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return timestamp ? date?.toLocaleDateString() : "-";
  };
  const capital = (str) => {
    return str ? str?.charAt(0)?.toUpperCase() + str?.slice(1) : "-";
  };
  const handleCancelSubscription = async () => {
    setLoading(true);
    try {
      const canceledSubscription = await cancelSubscription(
        activeSubscription[0].id
      );
      alert("Subscription Cancelled", canceledSubscription);
      setLoading(false);
      setShowModal(false);
    } catch (e) {
      console.log(e.message);
    }
  };
  const handleResumeSubscription = async () => {
    setLoading(true);
    try {
      const resumedSubscription = await resumeSubscription(
        activeSubscription[0].id
      );
      alert("Subscription Resumed", resumedSubscription);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };
  const onNavigate = (evt) => {
    // keep the locked href for our demo pages
    evt.preventDefault();
    setShowModal(true);
  };
  return (
    <SpaceBetween size="m">
      <Container header={<Header variant="h2">Subscriptions</Header>}>
        <SpaceBetween size="m">
          {activeSubscription && !activeSubscription[0]?.canceled_at  ? (
            <SpaceBetween size="m">
              {activeSubscription.map((active) => (
                <ExpandableSection
                  headerText="Active subscription"
                  defaultExpanded
                  key={active?.id}>
                  <SpaceBetween size="m">
                    <ColumnLayout columns={4} variant="text-grid">
                      <FormField label="ID">
                        <Box>{active?.id || "-"}</Box>
                      </FormField>
                      <FormField label="Status">
                        <Box>{statusType(active?.status) || "-"}</Box>
                      </FormField>
                      <FormField label="Plan type">
                        <Box>
                          {active?.items?.data[0]?.price?.nickname || "-"}
                        </Box>
                      </FormField>
                      <FormField label="Plan price">
                        <Box>
                          {active?.items?.data[0]?.price?.unit_amount == 35000
                            ? "$350"
                            : "$35"}
                        </Box>
                      </FormField>
                      <FormField label="Start Date">
                        <Box>{timestamp(active?.start_date)}</Box>
                      </FormField>
                      <FormField label="End Date">
                        <Box>{timestamp(active?.current_period_end)}</Box>
                      </FormField>
                      <FormField label="Payment Type">
                        <Box>
                          {capital(active?.items?.data[0]?.price?.type)}
                        </Box>
                      </FormField>
                      <FormField label="Trial Start Date">
                        <Box>{timestamp(active?.trial_start)}</Box>
                      </FormField>
                      <FormField label="Trial End Date">
                        <Box>{timestamp(active?.trial_end)}</Box>
                      </FormField>
                      <FormField label="Billing cycle Start">
                        <Box>{timestamp(active?.billing_cycle_anchor)}</Box>
                      </FormField>
                    </ColumnLayout>
                    <Box float="right">
                      <SpaceBetween size="m" direction="horizontal">
                        <Button onClick={onNavigate} loading={loading}>
                          Pause Active Subscription
                        </Button>
                        <Button onClick={onNavigate} variant="primary" loading={loading}>
                          Cancel Active Subscription
                        </Button>
                      </SpaceBetween>
                    </Box>
                  </SpaceBetween>
                </ExpandableSection>
              ))}
            </SpaceBetween>
          ) : (
            <ColumnLayout columns={2}>
              <Box>You currently have no active subscriptions.</Box>
              <Box>
                <Link href="/checkout">Add Subscriptions</Link>
              </Box>
            </ColumnLayout>
          )}
          <ExpandableSection headerText="View Cancelled Subscriptions">
         {activeSubscription && activeSubscription[0]?.canceled_at ? (
          <SpaceBetween size="m">
            {activeSubscription.map((active) => (
              <ColumnLayout columns={2} key={active.id}>
              <FormField label="Subscription ID">
              <Box>{active.id}</Box>
              </FormField>
              <Box float="right">
                        <Button onClick={onNavigate} variant="primary">
                           Resume Subscription
                        </Button>
                    </Box>
              </ColumnLayout>
            ))}
            </SpaceBetween>
         )
           : (
            <Box fontSize="heading-s">You don't have cancelled subscriptions</Box> 
          )}
          </ExpandableSection>
        </SpaceBetween>
      </Container>
      <Container header={<Header variant="h2">Invoices</Header>}>
        {}
        <SpaceBetween size="m">
          {invoices.map((invoice) => (
            <SpaceBetween size="m" key={invoice.id}>
              <ExpandableSection headerText={invoice.number}>
                <ColumnLayout columns={4} variant="text-grid">
                  <FormField label="Invoice">
                    <Link external href={invoice.hosted_invoice_url || null}>
                      View
                    </Link>
                  </FormField>
                  <FormField label="Download">
                    <Link external href={invoice.invoice_pdf || null}>
                      PDF
                    </Link>
                  </FormField>
                  <FormField label="Status">
                    <Box>{statusType(invoice.status)}</Box>
                  </FormField>
                  <FormField label="Amount Due">
                    <Box>{invoice.amount_due || "-"}</Box>
                  </FormField>
                  <FormField label="Amount Paid">
                    <Box>{invoice.amount_paid || "-"}</Box>
                  </FormField>
                  <FormField label="Invoice created at">
                    <Box>{timestamp(invoice.created)}</Box>
                  </FormField>
                  <FormField label="Period Start">
                    <Box>{timestamp(invoice.period_start)}</Box>
                  </FormField>
                  <FormField label="Period End">
                    <Box>{timestamp(invoice.period_end)}</Box>
                  </FormField>
                  <FormField label="Country">
                    <Box>{invoice.account_country}</Box>
                  </FormField>
                  <FormField label="Account name">
                    <Box>{invoice.account_name}</Box>
                  </FormField>
                  <FormField label="Customer name">
                    <Box>{invoice.customer_name}</Box>
                  </FormField>
                </ColumnLayout>
              </ExpandableSection>
            </SpaceBetween>
          ))}
        </SpaceBetween>
      </Container>
      <Modal
        visible={showModal}
        header="Cancel the active subscription ?"
        closeAriaLabel="Close modal"
        onDismiss={() => setShowModal(false)}
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                variant="link"
                onClick={() => {
                  setShowModal(false);
                }}>
                Leave
              </Button>
              <Button
                variant="primary"
                onClick={handleCancelSubscription}
                loading={loading}
                >
                Cancel Subscription
              </Button>
            </SpaceBetween>
          </Box>
        }>
        <Alert type="warning" statusIconAriaLabel="Warning">
          Are you sure that you want to leave the current page? The changes that
          you made won't be saved.
        </Alert>
      </Modal>
    </SpaceBetween>
  );
};
function Account(props) {
  const [email, setEmail] = useState(props.user);
  const [tools, setTools] = useState();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [toolsContent, setToolsContent] = useState();
  const [activeSubscription, setActiveSubscription] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };
  const updateTools = () => {
    setTools(element);
    setToolsOpen(true);
  };
  const fetchCustomer = async () => {
    try {
      const customer = await stripe.customers.list({
        email: email,
        limit: 1,
      });
      if (customer.data.length === 0) {
        return;
      } else {
        // Fetch the active subscriptions for the customer
        const fetchSubscriptions = async (customerId) => {
          const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
            status:'all'
          });
          return subscriptions.data;
        };
        const fetchInvoices = async (customerId) => {
          const invoices = await stripe.invoices.list({
            customer: customerId,
          });
          return invoices.data;
        };
        fetchSubscriptions(customer.data[0].id)
          .then((subscriptions) => setActiveSubscription(subscriptions))
          .catch((error) => console.log(error.message));

        fetchInvoices(customer.data[0].id)
          .then((invoices) => setInvoices(invoices))
          .catch((error) => console.log(error.message));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const cancelSubscription = async (activeSubscription) => {
    const deleteSub = await stripe.subscriptions.del(activeSubscription);
    return deleteSub;
  };
  const resumeSubscription = async (activeSubscription) => {
    const resumeSub = await stripe.subscriptions.resume(activeSubscription);
    return resumeSub;
  };
  useEffect(() => {
    fetchCustomer();
  }, []);
  return (
    <>
      <div id="h" style={{ position: "sticky", top: 0, zIndex: 1002 }}>
        <TopNavigations {...props} />
      </div>
      <AppLayout
        content={
          <>
            <SpaceBetween size="m">
              <ContentLayout header={<Header variant="h1">Profile</Header>}>
                <Content
                  activeSubscription={activeSubscription}
                  invoices={invoices}
                  cancelSubscription={cancelSubscription}
                  resumeSubscription={resumeSubscription}
                />
              </ContentLayout>
            </SpaceBetween>
          </>
        }
        headerSelector="#h"
        contentType="table"
        toolsOpen={toolsOpen}
        tools={toolsContent}
        navigationHide={true}
        toolsHide={true}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        footerSelector="#f"
        breadcrumbs={[]}
      />
      <AppFooter />
    </>
  );
}

export default Account;
