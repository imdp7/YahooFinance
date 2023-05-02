import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Cards,
  Header,
  SpaceBetween,
  Box,
  ExpandableSection,
  Link,
  ColumnLayout,
  Badge,
  FormField,
} from '@cloudscape-design/components';

const GetStarted = () => {
  return (
    <ExpandableSection
      variant="container"
      headerText="Getting started"
      defaultExpanded
    >
      <SpaceBetween size="m">
        <Box>
          Payment profiles are useful to avoid situations such as incomplete
          invoice payments, failed subscription orders, or unprocessed contract
          renewals despite having a valid default payment method
        </Box>
        <ColumnLayout columns={2} variant="text-grid">
          <div>
            <Box variant="h2">Benefits</Box>
            <ul>
              <SpaceBetween size="m">
                <li>
                  Use different payment methods for invoices from different AWS
                  service providers. For example, your AWS Europe invoice’s
                  default payment method is a SEPA bank account, but you want to
                  use a credit card to pay your AWS Marketplace invoices.
                </li>
                <li>
                  Customize your payment preferences for your AWS Organization's
                  member accounts that use different service providers. For
                  example, your AWS Europe invoice’s default payment method is a
                  SEPA bank account, but you want to pay your member account’s
                  AWS Inc. invoices using a credit card.
                </li>
                <li>
                  Always have a valid payment method for automatic bill
                  payments.
                </li>
                <li>Avoid service interruptions and incomplete balances.</li>
                <li>Payment profiles are simple to setup with no charge.</li>
              </SpaceBetween>
            </ul>
          </div>
          <div>
            <Box variant="h2">
              You might not benefit from payment profiles if
            </Box>
            <ul>
              <SpaceBetween size="m">
                <li>
                  You operate AWS accounts in a single country or billing
                  Region.
                </li>
                <li>
                  You receive AWS invoices for a single service, or all your AWS
                  invoices are from a single AWS service provider.
                </li>
                <li>
                  Your default payment method is valid and supported by your AWS
                  service providers.
                </li>
                <li>Your automated payments are processing successfully.</li>
                <li>Your default payment method is pay by invoice.</li>
              </SpaceBetween>
            </ul>
          </div>
        </ColumnLayout>
        <Box variant="h2">How it Works</Box>
        <ul>
          <SpaceBetween size="s">
            <li>
              Step 1: Choose a service provider. For more information, see the{' '}
              <Link external>Tax settings</Link> page
            </li>
            <li>
              Step 2: Choose the currency of your existing invoice for your
              selected service provider. The currency you choose here won’t
              change the currency your future invoices will be generated in. If
              you choose a payment currency that your card issuer doesn't
              support, you might be charged a foreign currency conversion or
              transaction fee.
            </li>
            <li>
              Step 3 (optional): Enter a name for your payment profile. This can
              be customized so you can recognize the profiles (for example: “My
              AWS Singapore profile”).
            </li>
            <li>
              Step 4: Assign a valid payment method. From your list of eligible
              payment instruments, choose the ones to apply for the preferences.
              To add a payment method, see Add a new payment method .
            </li>
            <li>
              Step 5: Choose "Create payment profile". Once you see a success
              notification, you can use your payment profile to pay your
              invoices automatically using your preferred payment instrument.
            </li>
          </SpaceBetween>
        </ul>
      </SpaceBetween>
    </ExpandableSection>
  );
};

const PaymentProfiles = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = React.useState([
    {
      card: 'Mastercard ••••9441',
      id_m: '123dass112a',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/989px-Mastercard-logo.svg.png',
      name: 'Darshan Patel',
      expiry: '2025/02',
      type: 'Default',
      provider: 'AWS Inc.',
      currency: 'USD - US Dollar',
      description: '',
    },
  ]);
  return (
    <Cards
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      selectedItems={selectedItems}
      ariaLabels={{
        itemSelectionLabel: (e, n) => `select ${n.name}`,
        selectionGroupLabel: 'Item selection',
      }}
      cardDefinition={{
        sections: [
          {
            id: 'provider',
            content: (item) => {
              return (
                <FormField label="Service Provider">
                  <Box>{item.provider}</Box>
                </FormField>
              );
            },
          },
          {
            id: 'currency',
            content: (item) => (
              <FormField label="Currency">
                <Box>{item.currency}</Box>
              </FormField>
            ),
          },
          {
            id: 'description',
            content: (item) => (
              <SpaceBetween size="s" direction="horizontal">
                <FormField label="Description">
                  <Box>{item.description ? item.description : '-'}</Box>
                </FormField>
              </SpaceBetween>
            ),
          },
          {
            id: 'card',
            content: (item) => (
              <SpaceBetween size="s" direction="horizontal">
                <Box>{item.card}</Box>
                <img className="card-section-image" src={item?.image} />
              </SpaceBetween>
            ),
          },
        ],
      }}
      cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 3 }]}
      items={[
        {
          card: 'Mastercard ••••9441',
          id_m: '123dass112a',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/989px-Mastercard-logo.svg.png',
          name: 'Darshan Patel',
          expiry: '2025/02/01',
          type: 'Default',
          provider: 'AWS Inc.',
          currency: 'USD - US Dollar',
          description: '',
        },
        {
          card: 'Visa ••••6031',
          id_m: 'ajkd123jkda',
          name: 'Andy Jassy',
          expiry: '2035/01/01',
          provider: 'AWS Marketplace',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/2560px-Visa.svg.png',
          type: 'null',
          currency: 'USD - US Dollar',
          description: '',
        },
      ]}
      loadingText="Loading Payment methods"
      selectionType="single"
      trackBy="name"
      visibleSections={['card', 'provider', 'description', 'currency']}
      empty={
        <Box textAlign="center" color="inherit">
          <b>You currently don't have any payment profiles</b>
        </Box>
      }
      header={
        <Header
          actions={
            <SpaceBetween direction="horizontal" size="s">
              <Button
                disabled={selectedItems[0]?.length === '0'}
                onClick={() =>
                  navigate(`profiles/${selectedItems[0]?.id_m}/edit`, {
                    state: {
                      title: 'Edit payment Details',
                      details: selectedItems[0],
                      des: 'Use payment profiles to customize your AWS payments by assigning payment methods to each AWS service provider. Automatically pay your AWS bills using payment methods other than your default payment method.',
                    },
                  })
                }
              >
                Edit
              </Button>
              <Button disabled={selectedItems[0]?.type === 'Default'}>
                Delete
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  navigate('paymentMethod/add', {
                    state: { title: 'Create payment profile' },
                  })
                }
              >
                Create payment profile
              </Button>
            </SpaceBetween>
          }
        >
          Payment profiles
        </Header>
      }
    />
  );
};
function Profile() {
  return (
    <SpaceBetween size="m">
      <Box variant="div">
        Use payment profiles to customize your AWS payments by assigning payment
        methods to each AWS service provider. Automatically pay your AWS bills
        using payment methods other than your default payment method.
      </Box>
      <GetStarted />
      <PaymentProfiles />
    </SpaceBetween>
  );
}

export default Profile;
