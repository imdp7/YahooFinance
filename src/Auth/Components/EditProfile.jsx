import React, { useState, useRef, useMemo } from 'react';
import {
  Container,
  FormField,
  Header,
  SpaceBetween,
  Cards,
  Box,
  Button,
  Badge,
  Alert,
  Input,
  Select,
} from '@cloudscape-design/components';
import countryList from 'react-select-country-list';
import { useNavigate } from 'react-router-dom';

function EditProfile(props) {
  const navigate = useNavigate();
  const options = useMemo(() => countryList().getData(), []);
  const { details } = props.state;
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState({ value: details.provider });
  const [currency, setCurrency] = useState({ value: details.currency });
  const [description, setDescription] = useState(details.description);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedItems, setSelectedItems] = React.useState([
    {
      card: 'Mastercard ••••9441',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/989px-Mastercard-logo.svg.png',
      name: 'Darshan Patel',
      id_m: '123dass112a',
      expiry: '2025/02',
      currency: 'USD - US Dollar',
      provider: 'AWS Marketplace',
    },
  ]);

  return (
    <SpaceBetween size="m">
      <Container
        header={
          <Header variant="h2" fitHeight>
            Payment profile details
          </Header>
        }
      >
        <SpaceBetween size="m">
          <FormField
            label="Service provider"
            description="AWS entity you'll purchase services from"
          >
            <Select
              className="input-width-card"
              selectedOption={provider}
              onChange={({ detail }) => setProvider(detail.selectedOption)}
              options={[
                {
                  value: 'AWS Inc.',
                  label: 'AWS Inc.',
                },
                {
                  value: 'AWS Marketplace',
                  label: 'AWS Marketplace',
                },
                {
                  value: 'AWS Australia.',
                  label: 'AWS Australia',
                },
                {
                  value: 'AWS Canada',
                  label: 'AWS Canada',
                },
              ]}
            />
          </FormField>
          <FormField
            label="Currency"
            description="Choose the currency of your existing invoice for your selected service provider. This currency won’t change the currency your future invoices are generated in."
          >
            <Select
              className="input-width-card"
              selectedOption={currency}
              onChange={({ detail }) => setCurrency(detail.selectedOption)}
              options={[
                {
                  value: 'AUD - Australian Dollar',
                  label: 'AUD - Australian Dollar',
                },
                {
                  value: 'USD - US Dollar',
                  label: 'USD - US Dollar',
                },
                {
                  value: 'CAD Canadian Dollar',
                  label: 'CAD Canadian Dollar',
                },
                {
                  value: 'CNY - Chinese Yuan',
                  label: 'CNY - Chinese Yuan',
                },
              ]}
            />
          </FormField>
          <FormField
            label="Description - optional"
            description="An optional name for you to recognize the profiles."
          >
            <Input
              value={description}
              className="input-width-card"
              onChange={({ detail }) => setDescription(detail.value)}
              placeholder="My AWS Singapore profile"
            />
          </FormField>
        </SpaceBetween>
      </Container>
      <Cards
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        selectedItems={selectedItems}
        ariaLabels={{
          itemSelectionLabel: (e, n) => `select ${n.name}`,
          selectionGroupLabel: 'Item selection',
        }}
        cardDefinition={{
          header: (item) => item.card,
          sections: [
            {
              id: 'image',
              content: (item) => (
                <div>
                  <img className="card-section-image" src={item?.image} />
                </div>
              ),
            },
            {
              id: 'name',
              content: (item) => item.name,
            },
            {
              id: 'expiry',
              content: (item) => item.expiry,
            },
            {
              id: 'currency',
              content: (item) => item.currency,
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
            expiry: '2025/02',
            type: 'Default',
            currency: 'USD - US Dollar',
          },
          {
            card: 'Visa ••••6031',
            id_m: 'ajkd123jkda',
            name: 'Andy Jassy',
            expiry: '2035/01',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/2560px-Visa.svg.png',
            currency: 'CAD - Canadian Dollar',
          },
        ]}
        loadingText="Loading Payment methods"
        selectionType="single"
        trackBy="name"
        visibleSections={['card', 'image', 'name', 'expiry', 'currency']}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No payment methods</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              No payment methods.
            </Box>
            <Button>Add payment method</Button>
          </Box>
        }
        header={
          <Header
            counter={
              selectedItems.length ? '(' + selectedItems.length + '/2)' : '(0)'
            }
            actions={<Button iconName="refresh" loading={loading} />}
          >
            Payment methods
          </Header>
        }
      />
      {errorMessage && <Alert type="error">{errorMessage}</Alert>}
      <SpaceBetween size="l" direction="horizontal" className="btn-right">
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button variant="primary" loading={loading}>
          Save changes
        </Button>
      </SpaceBetween>
    </SpaceBetween>
  );
}

export default EditProfile;
