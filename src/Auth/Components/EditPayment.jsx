import React, { useState, useRef, useMemo } from 'react';
import {
  Container,
  FormField,
  Header,
  SpaceBetween,
  DatePicker,
  Box,
  Modal,
  Button,
  Badge,
  Alert,
  Input,
  Select,
} from '@cloudscape-design/components';
import countryList from 'react-select-country-list';
import { useNavigate } from 'react-router-dom';

function EditPayment(props) {
  const navigate = useNavigate();
  const options = useMemo(() => countryList().getData(), []);
  const { details } = props.state;
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(details.expiry);
  const [name, setName] = useState(details.name);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [nameCard, setNameCard] = useState(details.name);
  const [company, setCompany] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [country, setCountry] = useState(null);
  const dateRef = useRef();
  const onNavigate = (evt) => {
    // keep the locked href for our demo pages
    evt.preventDefault();
    setShowModal(true);
  };
  return (
    <SpaceBetween size="m">
      <Container
        header={
          <Header variant="h2" fitHeight>
            Payment method details
          </Header>
        }
      >
        <SpaceBetween size="m">
          <SpaceBetween size="m" direction="horizontal">
            <Box fontSize="heading-s" variant="h1">
              {details.card}
            </Box>
            <img src={details.image} className="card-section-image" />
            {details.type === 'Default' ? (
              <Badge color="blue">{details.type}</Badge>
            ) : null}
          </SpaceBetween>
          <FormField label="Expiry date">
            <DatePicker
              ref={dateRef}
              step={1}
              onChange={({ detail }) => {
                setDate(detail.value);
              }}
              value={date}
              openCalendarAriaLabel={(selectedDate) =>
                'Choose certificate expiry date' +
                (selectedDate ? `, selected date is ${selectedDate}` : '')
              }
              nextMonthAriaLabel="Next month"
              placeholder="YYYY/MM/DD"
              previousMonthAriaLabel="Previous month"
              todayAriaLabel="Today"
            />
          </FormField>
          <FormField label="Name on card">
            <Input
              step={2}
              className="input-width-name"
              value={nameCard}
              onChange={({ detail }) => setNameCard(detail.value)}
            />
          </FormField>
        </SpaceBetween>
      </Container>
      <Container header={<Header variant="h2">Billing Address</Header>}>
        <SpaceBetween size="m">
          <FormField label="Full name">
            <Input
              className="input-width-card"
              value={name}
              step={5}
              onChange={({ detail }) => setName(detail.value)}
            />
          </FormField>
          <FormField label="Company - optional">
            <Input
              className="input-width-card"
              value={company}
              step={6}
              onChange={({ detail }) => setCompany(detail.value)}
            />
          </FormField>
          <FormField label="Select Country">
            <Select
              className="input-width-card"
              options={options}
              step={7}
              errorText="Error fetching countries."
              placeholder="Choose a country"
              recoveryText="Retry"
              filteringType="auto"
              selectedAriaLabel="Selected"
              triggerVariant="option"
              selectedOption={country}
              onChange={({ detail }) => setCountry(detail.selectedOption)}
            />
          </FormField>
          <FormField label="Address">
            <SpaceBetween size="xs">
              <Input
                className="input-width-card"
                value={address1}
                step={8}
                onChange={({ detail }) => setAddress1(detail.value)}
              />
              <Input
                className="input-width-card"
                value={address2}
                step={9}
                placeholder="Apartment, suite, unit floor, etc."
                onChange={({ detail }) => setAddress2(detail.value)}
              />
            </SpaceBetween>
          </FormField>
          <SpaceBetween size="m" direction="horizontal">
            <FormField label="City">
              <Input
                value={city}
                step={10}
                onChange={({ detail }) => setCity(detail.value)}
              />
            </FormField>
            <FormField label="State/province/region">
              <Input
                value={state}
                step={11}
                onChange={({ detail }) => setState(detail.value)}
              />
            </FormField>
          </SpaceBetween>
          <FormField label="Zip code/postal code">
            <Input
              className="input-width-card"
              value={zipCode}
              step={12}
              onChange={({ detail }) => setZipCode(detail.value)}
            />
          </FormField>
          <FormField label="Phone number">
            <Input
              className="input-width-card"
              value={phone}
              step={13}
              placeholder="+1 222-333-4444"
              inputMode="tel"
              onChange={({ detail }) => setPhone(detail.value)}
            />
          </FormField>
          <FormField label="Billing contact email - optional">
            <Input
              className="input-width-card"
              value={email}
              step={14}
              inputMode="email"
              onChange={({ detail }) => setEmail(detail.value)}
            />
          </FormField>
        </SpaceBetween>
      </Container>
      {errorMessage && <Alert type="error">{errorMessage}</Alert>}
      <SpaceBetween size="l" direction="horizontal" className="btn-right">
        <Button onClick={onNavigate}>Cancel</Button>
        <Button variant="primary" loading={loading}>
          Save changes
        </Button>
      </SpaceBetween>
      <Modal
        visible={showModal}
        header="Leave page"
        closeAriaLabel="Close modal"
        onDismiss={() => setShowModal(false)}
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                variant="link"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={() => navigate(-1)}>
                Leave
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        <Alert type="warning" statusIconAriaLabel="Warning">
          Are you sure that you want to leave the current page? The changes that
          you made won't be saved.
        </Alert>
      </Modal>
    </SpaceBetween>
  );
}

export default EditPayment;
